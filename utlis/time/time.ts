export const timeConverter = (kickOffTime: Date) => {
    const localTime = new Date(kickOffTime); // `kickoffTime` is already a JS Date
    const utcTime = localTime.toISOString().substring(11, 16); // "14:30" from UTC

    const wibFormatter = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const wibTime = wibFormatter.format(localTime); // e.g., "21.30"

    const formattedKickoffText = utcTime;

    return formattedKickoffText
}