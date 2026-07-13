'use client';

import { useEffect } from "react";

/** Registers the PWA service worker (push notifications + installability). Renders nothing. */
export function ServiceWorkerRegistrar() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                // registration failing (e.g. unsupported browser) must never break the app
            })
        }
    }, [])
    return null;
}
