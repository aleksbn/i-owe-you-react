import { add, differenceInDays, formatDistance, parseISO } from "date-fns";

export const subtractDates = (dateStr1, dateStr2) =>
	differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
	formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	})
		.replace("about ", "")
		.replace("in", "In");

export const getToday = function (options = {}) {
	const today = new Date();

	if (options?.end) today.setUTCHours(23, 59, 59, 999);
	else today.setUTCHours(0, 0, 0, 0);
	return today.toISOString();
};

export const formatCurrency = (value) =>
	new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
		value
	);

export const fromToday = (numDays, withTime = false) => {
	const date = add(new Date(), { days: numDays });
	if (!withTime) date.setUTCHours(0, 0, 0, 0);
	return date.toISOString().slice(0, -1);
};
