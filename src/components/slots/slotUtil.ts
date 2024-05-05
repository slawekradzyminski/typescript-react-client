export const roundToNextQuarterHour = (date: Date) => {
    const minutes = date.getMinutes();
    const nextQuarterHour = Math.ceil(minutes / 15) * 15;
    date.setMinutes(nextQuarterHour);
    date.setSeconds(0);
    date.setMilliseconds(0);

    if (minutes % 15 === 0) {
        date.setMinutes(date.getMinutes() + 15);
    }

    return date;
};