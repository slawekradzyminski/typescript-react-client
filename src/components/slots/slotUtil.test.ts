import { roundToNextQuarterHour } from './slotUtil';

describe('roundToNextQuarterHour', () => {
    it('rounds up to the next quarter-hour when minutes are not on a quarter-hour', () => {
        const date = new Date('2023-01-01T15:57:00');
        const roundedDate = roundToNextQuarterHour(date);
        expect(roundedDate).toEqual(new Date('2023-01-01T16:00:00'));
    });

    it('adds 15 minutes when minutes are exactly on a quarter-hour', () => {
        const date = new Date('2023-01-01T16:00:00');
        const roundedDate = roundToNextQuarterHour(date);
        expect(roundedDate).toEqual(new Date('2023-01-01T16:15:00'));
    });

    it('rounds up to the next quarter-hour for minutes just after a quarter-hour', () => {
        const date = new Date('2023-01-01T16:01:00');
        const roundedDate = roundToNextQuarterHour(date);
        expect(roundedDate).toEqual(new Date('2023-01-01T16:15:00'));
    });

    it('rounds up to the next quarter-hour for minutes before a quarter-hour', () => {
        const date = new Date('2023-01-01T16:20:00');
        const roundedDate = roundToNextQuarterHour(date);
        expect(roundedDate).toEqual(new Date('2023-01-01T16:30:00'));
    });
});