export const timeConverter = (kickOffTime: Date) => {
    const localTime = new Date(kickOffTime);
    return localTime.toISOString().substring(11, 16); // "HH:mm" in UTC
}

const pad = (n: number) => String(n).padStart(2, '0')

/** "YYYY-MM-DD" in local time */
export const formatDate = (value: Date | string | null | undefined) => {
    if (!value) { return '-' }
    const d = new Date(value)
    if (isNaN(d.getTime())) { return '-' }
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/** "YYYY-MM-DD HH:mm" in local time */
export const formatDateTime = (value: Date | string | null | undefined) => {
    if (!value) { return '-' }
    const d = new Date(value)
    if (isNaN(d.getTime())) { return '-' }
    return `${formatDate(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

/** "YYYY-MM-DDTHH:mm" for <input type="datetime-local"> */
export const toDatetimeLocal = (value: Date | string | null | undefined): string => {
    let d = value ? new Date(value) : new Date()
    if (isNaN(d.getTime())) { d = new Date() }
    return `${formatDate(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
