import supabase, { supabaseUrl } from "./supabase";

export async function getPersons() {
	let query = supabase.from("persons").select("*", { count: "exact" });

	const { data, error, count } = await query;

	if (error) {
		throw new Error("People could not be loaded");
	}

	return { data, error, count };
}

export async function getPerson(id) {
	if (id === 0) return { data: null, error: null };
	const { data, error } = await supabase
		.from("persons")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		throw new Error("Single person could not be loaded");
	}

	return { data, error };
}

export async function createEditPerson(newPerson) {
	const hasImagePath = newPerson.image?.startsWith?.(supabaseUrl);
	const imageName = `${Math.random()}-${newPerson.image.name}`.replace("/", "");
	const imagePath = hasImagePath
		? newPerson.image
		: `${supabaseUrl}/storage/v1/object/public/personImages/${imageName}`;

	let query = supabase.from("persons");

	// CREATE
	if (!newPerson.id) {
		query = query.insert([
			{
				...newPerson,
				image: imagePath,
			},
		]);
	}

	// UPDATE
	if (newPerson.id)
		query = query
			.update({ ...newPerson, image: imagePath })
			.eq("id", newPerson.id);

	const { data, error } = await query.select().single();

	if (error) {
		throw new Error("Person could not be created");
	}

	const { error: storageError } = supabase.storage
		.from("personImages")
		.upload(imageName, newPerson.image);

	if (storageError) {
		await supabase.from("persons").delete().eq("id", data.id);
		throw new Error(
			"Person image could not be uploaded. All changes are reverted."
		);
	}

	return { data, error };
}

export async function deletePerson(id) {
	const { error } = await supabase.from("persons").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Person could not be deleted");
	}
}
