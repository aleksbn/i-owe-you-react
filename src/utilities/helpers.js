import { add, differenceInDays, formatDistance, parseISO } from "date-fns";

/**
 * Subtracts two dates and returns the difference in days.
 *
 * @param {string} dateStr1 - The first date as a string.
 * @param {string} dateStr2 - The second date as a string.
 * @return {number} The difference in days between the two dates.
 */
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

/**
 * Formats the distance from a given date to the current date with suffix, and replaces certain words for better readability.
 *
 * @param {string} dateStr - The date to calculate the distance from.
 * @return {string} The formatted distance from the given date to now.
 */
export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

/**
 * Function to get the current date with optional adjustments for start/end of day.
 *
 * @param {object} options - Optional object with 'end' property to adjust for end of day.
 * @return {string} The ISO string representation of the current date.
 */
export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end)
    today.setUTCHours(23, 59, 59, 999); // Adjusting for end of day
  else today.setUTCHours(0, 0, 0, 0); // Defaulting to start of day

  return today.toISOString(); // Returning the ISO string representation of the date.
};

/**
 * Formats a given value as a currency in USD.
 *
 * @param {number} value - The value to be formatted.
 * @return {string} The formatted value as a currency in USD.
 */
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

/**
 * Adds the specified number of days to the current date, adjusts for time if required, and returns the ISO string representation of the resulting date.
 *
 * @param {number} numDays - The number of days to add to the current date.
 * @param {boolean} withTime - Flag indicating whether to include time in the result.
 * @return {string} The ISO string representation of the resulting date.
 */
export const fromToday = (numDays, withTime = false) => {
  const date = add(new Date(), { days: numDays }); // Adding the specified number of days to the current date.
  if (!withTime) date.setUTCHours(0, 0, 0, 0); // Adjusting for time if required.
  return date.toISOString().slice(0, -1); // Returning ISO string representation of the date.
};
