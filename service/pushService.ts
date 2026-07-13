import { client } from "@/utlis/axios";

const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64)
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)))
}

export const isPushSupported = () =>
    typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window

export async function getPushPublicKey (): Promise<string | null> {
    const res = await client.get('/push/public-key')
    return res.data?.data?.publicKey || null
}

export async function getCurrentSubscription () {
    if (!isPushSupported()) { return null }
    const registration = await navigator.serviceWorker.ready
    return registration.pushManager.getSubscription()
}

/** returns true when notifications are enabled end-to-end */
export async function enablePush (): Promise<boolean> {
    if (!isPushSupported()) { return false }
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') { return false }
    const publicKey = await getPushPublicKey()
    if (!publicKey) { return false } // server has no VAPID keys configured
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
    })
    const res = await client.post('/push/subscribe', { subscription: subscription.toJSON() })
    return !res.data?.error
}

export async function disablePush (): Promise<void> {
    const subscription = await getCurrentSubscription()
    if (!subscription) { return }
    await client.post('/push/unsubscribe', { endpoint: subscription.endpoint })
    await subscription.unsubscribe()
}
