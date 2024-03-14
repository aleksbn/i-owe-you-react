import { PAGE_SIZE } from "../utilities/constants";
import supabase from "./supabase";

export async function getOwings({ filter, sortBy, page }) {
	let query = supabase
		.from("owings")
		.select("*, persons(*), payments(*)", { count: "exact" });

	if (sortBy && sortBy.field === "movementDate") {
		query = query.order(sortBy.field, {
			ascending: sortBy.direction === "asc",
		});
	}

	if (sortBy && sortBy.field === "amount") {
		query = query.then((response) => {
			response.data.sort((a, b) =>
				sortBy.direction !== "asc"
					? Math.abs(b.amount) - Math.abs(a.amount)
					: Math.abs(a.amount) - Math.abs(b.amount)
			);
			return response;
		});
	}

	let { data, error, count } = await query;

	if (filter) {
		const status = filter.value === "active";
		data = data.filter((owing) => {
			let total = owing.payments.reduce((acc, cur) => acc + cur.amount, 0);
			return status === (total !== Math.abs(owing.amount));
		});
	}

	count = data.length;

	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE;
		data = data.slice(from, to);
	}

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

	const { data, error } = await query.select().single();

	if (error) {
		throw new Error("Owing could not be created");
	}

	return { data, error };
}

export async function deleteOwing(id) {
	const { error } = await supabase.from("owings").delete().eq("id", id);

	if (error) {
		throw new Error("Owing could not be deleted");
	}
}
