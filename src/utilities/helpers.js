// Importing necessary functions from the date-fns library.
import { add, differenceInDays, formatDistance, parseISO } from "date-fns";

// Function to subtract dates and return the difference in days.
export const subtractDates = (dateStr1, dateStr2) =>
	differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// Function to format the distance from a given date to now.
export const formatDistanceFromNow = (dateStr) =>
	formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	})
		.replace("about ", "")
		.replace("in", "In");

// Function to get the current date with optional adjustments for start/end of day.
export const getToday = function (options = {}) {
	const today = new Date();

	if (options?.end)
		today.setUTCHours(23, 59, 59, 999); // Adjusting for end of day
	else today.setUTCHours(0, 0, 0, 0); // Defaulting to start of day

	return today.toISOString(); // Returning the ISO string representation of the date.
};

// Function to format a currency value.
export const formatCurrency = (value) =>
	new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
		value
	);

// Function to get the date from today with an offset in days, with optional time inclusion.
export const fromToday = (numDays, withTime = false) => {
	const date = add(new Date(), { days: numDays }); // Adding the specified number of days to the current date.
	if (!withTime) date.setUTCHours(0, 0, 0, 0); // Adjusting for time if required.
	return date.toISOString().slice(0, -1); // Returning ISO string representation of the date.
};
