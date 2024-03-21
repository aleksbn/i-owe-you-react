import supabase from "./supabase";

export async function getPayments({ userData, owingId }) {
	if (owingId === "0") return { data: null, error: null, count: 0 };

	let query = supabase
		.from(`payments_${userData}`)
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
