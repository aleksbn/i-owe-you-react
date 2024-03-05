import supabase from "./supabase";

export async function getOwings() {
	let query = supabase
		.from("movements")
		.select("*, persons(*), payments(*)", { count: "exact" });

	const { data, error, count } = await query;

	if (error) {
		throw new Error("Owings could not be loaded");
	}

	return { data, error, count };
}
