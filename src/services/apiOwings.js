import { PAGE_SIZE } from "../utilities/constants";
import supabase from "./supabase";

/**
 * Retrieves owings data based on specified filters and sorting options.
 *
 * @param {Object} filter - The filter object to apply to the query.
 * @param {Object} sortBy - The sorting options for the query.
 * @param {number} page - The page number for pagination.
 * @param {string} userData - The user data identifier.
 * @returns {Object} An object containing the retrieved data, any errors, and the count of results.
 */
export async function getOwings({ filter, sortBy, page, userData }) {
  let query = supabase
    .from(`owings_${userData}`)
    .select(`*, persons_${userData}(*), payments_${userData}(*)`, {
      count: "exact",
    });

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
      let total = owing[`payments_${userData}`].reduce(
        (acc, cur) => acc + cur.amount,
        0
      );
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

/**
 * Retrieves a single owing based on the provided id and user data.
 *
 * @param {number} id - The id of the owing to retrieve.
 * @param {string} userData - The user data to identify the owings table.
 * @return {Object} An object containing the retrieved owing data and any potential error.
 */
export async function getOwing({ id, userData }) {
  if (id === 0) return { data: null, error: null };

  let query = supabase
    .from(`owings_${userData}`)
    .select(`*, persons_${userData}(*), payments_${userData}(*)`)
    .eq("id", id)
    .single();

  const { data, error } = await query;

  if (error) {
    throw new Error("Owings could not be loaded");
  }

  return { data, error };
}

/**
 * Creates or updates an owing based on the provided data.
 *
 * @param {Object} newOwing - The data of the owing to be created or updated.
 * @param {string} userData - The user data to identify the owings table.
 * @return {Object} An object containing the created or updated owing data and any potential error.
 */
export async function createEditOwing({ newOwing, userData }) {
  let query = supabase.from(`owings_${userData}`);

  let owingForInsert = { ...newOwing };
  owingForInsert.amount = newOwing.owedByMe
    ? newOwing.amount
    : -newOwing.amount;
  owingForInsert.personId = +owingForInsert.personId;
  delete owingForInsert.owedByMe;
  delete owingForInsert[`payments_${userData}`];
  delete owingForInsert[`persons_${userData}`];

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

/**
 * Deletes an owing based on the provided owingId and userData.
 *
 * @param {number} owingId - The ID of the owing to be deleted.
 * @param {string} userData - The user data to identify the owings table.
 * @return {Object} An object containing any potential error during deletion.
 */
export async function deleteOwing({ owingId, userData }) {
  const { error } = await supabase
    .from(`owings_${userData}`)
    .delete()
    .eq("id", owingId);

  if (error) {
    throw new Error("Owing could not be deleted");
  }
}
