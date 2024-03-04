import supabase from "./supabase";

export async function getPersons() {
	let query = supabase.from("persons").select("*", { count: "exact" });

	const { data, error, count } = await query;

	if (error) {
		throw new Error("People could not be loaded");
	}

	return { data, count };
}
