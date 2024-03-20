import supabase from "./supabase";

export async function getPayments({ owingId }) {
	if (owingId === "0") return { data: null, error: null, count: 0 };

	let query = supabase
		.from(`payments_${"f74fd96d64194db88394cabc984a4b14"}`)
		.select("*", { count: "exact" })
		.eq("owingId", +owingId)
		.order("dateOfPayment");

	const { data, error, count } = await query;

	if (error) {
		throw new Error("Payments could not be loaded");
	}

	return { data, error, count };
}

export async function createPayment(newPayment) {
	let query = supabase.from(`payments_${"f74fd96d64194db88394cabc984a4b14"}`);
	query = query.insert([{ ...newPayment }]);
	const { data, error } = await query.select().single();

	if (error) {
		throw new Error("Payment could not be created");
	}

	return { data, error };
}

export async function deletePayment(id) {
	const { error } = await supabase
		.from(`payments_${"f74fd96d64194db88394cabc984a4b14"}`)
		.delete()
		.eq("id", id);

	if (error) {
		throw new Error("Owing could not be deleted");
	}
}
