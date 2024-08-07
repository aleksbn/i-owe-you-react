import { PAGE_SIZE } from "../utilities/constants";
import supabase, { supabaseUrl } from "./supabase";

/**
 * Retrieves a list of persons based on the provided parameters.
 *
 * @param {number} page - The page number for pagination.
 * @param {string} nickname - The nickname to filter the persons by.
 * @param {string} userData - The user data to retrieve the persons for.
 * @return {Object} An object containing the filtered data, error status, and the total count of persons.
 */
export async function getPersons({ page, nickname, userData }) {
  let query = supabase
    .from(`persons_${userData}`)
    .select("*", { count: "exact" })
    .order("lastName", "firstName");

  let { data, error, count } = await query;

  if (nickname) {
    data = data.filter((person) =>
      person.nickname.toLowerCase().includes(nickname.toLowerCase())
    );
  }

  count = data.length;

  if (page) {
    const from = (+page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    data = data.slice(from, to);
  }

  if (error) {
    throw new Error("People could not be loaded");
  }

  return { data, error, count };
}

/**
 * Retrieves a single person based on the provided id and user data.
 *
 * @param {number} id - The id of the person to retrieve.
 * @param {string} userData - The user data to identify the persons table.
 * @return {Object} An object containing the retrieved person data and any potential error.
 */
export async function getPerson({ id, userData }) {
  if (id === 0) return { data: null, error: null };
  const { data, error } = await supabase
    .from(`persons_${userData}`)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Single person could not be loaded");
  }

  return { data, error };
}

/**
 * Creates or edits a person based on the provided data.
 *
 * @param {Object} newPerson - The data of the person to create or edit.
 * @param {string} userData - The user data to identify the persons table.
 * @return {Object} An object containing the created or edited person data and any potential error.
 */
export async function createEditPerson({ newPerson, userData }) {
  const hasImagePath = newPerson.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newPerson.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? newPerson.image
    : `${supabaseUrl}/storage/v1/object/public/personImages/${imageName}`;

  let query = supabase.from(`persons_${userData}`);

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
    await supabase.from(`persons_${userData}`).delete().eq("id", data.id);
    throw new Error(
      "Person image could not be uploaded. All changes are reverted."
    );
  }

  return { data, error };
}

/**
 * Deletes a person from the database based on the provided ID and user data.
 *
 * @param {Object} options - The options for deleting the person.
 * @param {string} options.id - The ID of the person to delete.
 * @param {string} options.userData - The user data to identify the persons table.
 * @return {Promise<void>} - A promise that resolves when the person is successfully deleted.
 * @throws {Error} - Throws an error if the person could not be deleted.
 */
export async function deletePerson({ id, userData }) {
  const { error } = await supabase
    .from(`persons_${userData}`)
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Person could not be deleted");
  }
}
