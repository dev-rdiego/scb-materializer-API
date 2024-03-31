
/**
 * Formats the given time into hours and minutes.
 *
 * @param {number} time - The time to be formatted in minutes.
 * @returns {{ hours: number, minutes: number }} - The formatted time object with hours and minutes.
 */
function formatTime(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return { hours, minutes };
}

module.exports = {
    formatTime
};
