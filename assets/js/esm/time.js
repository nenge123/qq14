export const epochTimeFactor = 20.571428571428573; // 60 * 24 Eorzean minutes (one day) per 70 real-world minutes.
export const millisecondsPerEorzeaMinute = (2 + 11 / 12) * 1000;
export const millisecondsPerDay = 24 * 60 * 60 * 1000;
export const monthDay = { month: 'numeric', day: 'numeric' };
export let timeOffset = 0;
export function localToEorzea(date) {
    return new Date(date.getTime() * epochTimeFactor);
}
export function eorzeaToLocal(date) {
    return new Date(date.getTime() / epochTimeFactor);
}
export function eCurrentTime() {
    return localToEorzea(timenow());
}
export function formatTime(date, options) {
    if (options) // Optimization: Chrome slow path.
        return date.toLocaleTimeString(navigator.language || "en-US", options);
    return date.toLocaleTimeString();
}
export function formatDateTime(date) {
    if (!date)
        return '(error)';
    return date.toLocaleDateString(navigator.language || "en-US", monthDay) + ' ' + formatTime(date);
}
export function formatEorzeaHour(eDate) {
    return zeroPad(eDate.getUTCHours(), 2);
}

export function getPercentTimeDifference(start, end) {
    var start = start.getTime();
    var end = end.getTime();
    var now = (timenow()).getTime();
    return ((now - start) / (end - start)) * 100;
}

export function formatCountdown(end) {
    var remainingSeconds = (end.getTime() - (timenow()).getTime()) / 1000;
    if (remainingSeconds <= 0)
        return '0:00';

    if (remainingSeconds > 60 * 3)
        return formatHoursMinutes(remainingSeconds);

    return formatHoursMinutesSeconds(remainingSeconds);
}

export function formatHoursMinutes(totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours)
        return hours + 'h ' + zeroPad(minutes, 2) + 'm';
    else
        return minutes + 'm';
}

export function formatHoursMinutesSeconds(totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = Math.floor((totalSeconds % 3600) % 60);

    if (hours)
        return hours + ':' + zeroPad(minutes, 2) + ':' + zeroPad(seconds, 2);
    else
        return minutes + ':' + zeroPad(seconds, 2);
}
export function timenow() {
    var date = new Date();
    if (timeOffset)
        date.setTime(date.getTime() + timeOffset);
    return date;
}

export function removeOffset(offsetDate) {
    if (!timeOffset)
        return offsetDate;

    var date = new Date(offsetDate);
    date.setTime(date.getTime() - timeOffset);
    return date;
}

export function getSpawnTimes(eStart, time, uptime) {
    var eSpawn = new Date(eStart);
    eSpawn.setUTCDate(eSpawn.getUTCDate() - 2);
    eSpawn.setUTCMinutes(0);
    eSpawn.setUTCHours(0);
    eSpawn.setUTCSeconds(0);

    var eSpawnPrevious, eExpirePrevious;
    while (true) {
        for (var i = 0; i < time.length; i++) {
            eSpawn.setUTCHours(time[i]);
            var eExpire = new Date(eSpawn);
            eExpire.setUTCMinutes(uptime);

            if (eExpire > eStart) {
                return { eSpawn: eSpawnPrevious, eExpire: eExpirePrevious, eNextSpawn: eSpawn, eNextExpire: eExpire };
            } else {
                eSpawnPrevious = new Date(eSpawn);
                eExpirePrevious = new Date(eExpire);
            }
        }

        eSpawn.setUTCHours(0);
        eSpawn.setUTCDate(eSpawn.getUTCDate() + 1);
    }
}
export function zeroPad(num, digits) {
    return ("00000000" + num).slice(-digits);
}