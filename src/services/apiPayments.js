import supabase from "./supabase";

export async function getPayments({ userData, owingId }) {
	if (owingId === "0") return { data: null, error: null, count: 0 };

	let query = supabase.from(`payments_${userData}`);
	query =
		owingId === "all"
			? query.select("*", { count: "exact" }).order("dateOfPayment")
			: query
					.select("*", { count: "exact" })
					.eq("owingId", +owingId)
					.order("dateOfPayment");

	const { data, error, count } = await query;

	if (error) {
		throw new Error("Payments could not be loaded");
	}

	return { data, error, count };
}

export async function createPayment({ newPayment, userData }) {
	let query = supabase.from(`payments_${userData}`);
	query = query.insert([{ ...newPayment }]);
	const { data, error } = await query.select().single();

	if (error) {
		throw new Error("Payment could not be created");
	}

	return { data, error };
}

export async function deletePayment({ id, userData }) {
	const { error } = await supabase
		.from(`payments_${userData}`)
		.delete()
		.eq("id", id);

	if (error) {
		throw new Error("Owing could not be deleted");
	}
}

export async function getTodayPayments({ userData }) {
	const { data: payments, error: paymentsError } = await supabase
		.from(`payments_${userData}`)
		.select(`*, owings_${userData}(*)`);

	if (paymentsError) {
		console.error(paymentsError);
		throw new Error("Todays activities could not get loaded");
	}

	const activities = await Promise.all(
		payments
			.filter(
				(payment) =>
					new Date().toDateString() ===
					new Date(payment.dateOfPayment).toDateString()
			)
			.map(async (p) => {
				const owing = p[`owings_${userData}`];
				p["direction"] = owing.amount > 0 ? "tome" : "toother";
				const { data: person } = await supabase
					.from(`persons_${userData}`)
					.select("*")
					.eq("id", owing.personId)
					.single();
				p[
					"name"
				] = `${person.firstName} ${person.lastName} (${person.nickname})`;
				return p;
			})
	);

	return { activities, paymentsError };
}
