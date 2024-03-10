import supabase from "./supabase";

export async function getOwings() {
	let query = supabase
		.from("owings")
		.select("*, persons(*), payments(*)", { count: "exact" });

	const { data, error, count } = await query;

	if (error) {
		throw new Error("Owings could not be loaded");
	}

	return { data, error, count };
}

export async function getOwing(id) {
	if (id === 0) return { data: null, error: null };

	let query = supabase
		.from("owings")
		.select("*, persons(*), payments(*)")
		.eq("id", id)
		.single();

	const { data, error } = await query;

	if (error) {
		throw new Error("Owings could not be loaded");
	}

	return { data, error };
}

export async function createEditOwing(newOwing) {
	let query = supabase.from("owings");

	let owingForInsert = { ...newOwing };
	owingForInsert.status = "active";
	owingForInsert.amount = newOwing.owedByMe
		? newOwing.amount
		: -newOwing.amount;
	owingForInsert.personId = +owingForInsert.personId;
	delete owingForInsert.owedByMe;
	delete owingForInsert.payments;
	delete owingForInsert.persons;

	// CREATE
	if (!owingForInsert.id) {
		query = query.insert([
			{
				...owingForInsert,
			},
		]);
	}

	// UPDATE
	if (owingForInsert.id) {
		query = query.update({ ...owingForInsert }).eq("id", owingForInsert.id);
	}

	console.log(query);
	console.log(owingForInsert);

	const { data, error } = await query.select().single();

	if (error) {
		console.log(error);
		throw new Error("Owing could not be created");
	}

	return { data, error };
}

export async function deleteOwing(id) {
	console.log(id);
	const { error } = await supabase.from("owings").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Owing could not be deleted");
	}
}
