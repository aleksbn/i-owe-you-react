import supabase, { supabaseUrl } from "./supabase";

/**
 * Sign up a new user.
 *
 * @param {Object} options - The options for the signup.
 * @param {string} options.fullName - The full name of the user.
 * @param {string} options.email - The email of the user.
 * @param {string} options.password - The password of the user.
 * @return {Promise<Object>} A promise that resolves to an object containing the user data and any errors.
 */
export async function signup({ fullName, email, password }) {
  // Signing up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
      sendVerificationEmail: false,
    },
  });

  if (error) {
    return { data: null, error };
  }

  const table_id = `${data.user.id.split("-").join("")}`;
  const { error: firstTableError } = await supabase.rpc(
    "create_persons_table",
    { table_id: `${table_id}` }
  );
  if (firstTableError) console.log(firstTableError);
  const { error: secondTableError } = await supabase.rpc(
    "create_owings_table",
    { table_id: `${table_id}` }
  );
  if (secondTableError) console.log(secondTableError);
  const { error: thirdTableError } = await supabase.rpc(
    "create_payments_table",
    { table_id: `${table_id}` }
  );
  if (thirdTableError) console.log(thirdTableError);

  // Return the user data and any errors
  return { data: data.user, error: null };
}

/**
 * Logs in a user with the provided email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @return {Object} The user data upon successful login.
 */
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Retrieves the current user session from the Supabase authentication service.
 *
 * @return {Promise<Object|null>} The user session object if it exists, or null if it doesn't.
 */
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  return session.session;
}

/**
 * Logs out the current user from the Supabase authentication service.
 *
 * @return {Promise<void>} A promise that resolves when the user is successfully logged out.
 * @throws {Error} If there is an error during the logout process.
 */
export async function logout() {
  const { error } = supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Updates the current user's information in the Supabase authentication service.
 *
 * @param {Object} options - The options for updating the user.
 * @param {string} options.fullName - The new full name of the user.
 * @param {string} options.password - The new password of the user.
 * @param {Blob} options.avatar - The new avatar image of the user.
 * @return {Promise<Object>} A Promise that resolves to the updated user information.
 * @throws {Error} If there is an error during the update process.
 */
export async function updateCurrentUser({ fullName, password, avatar }) {
  //1. update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  //2. UPLOAD AVATAR IMAGE
  const filename = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(filename, avatar);
  if (storageError) {
    throw new Error(storageError.message);
  }

  //3. UPDATE USER PROFILE PHOTO
  const { data: updateUser, error: errorAtTheEnd } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${filename}`,
      },
    });
  if (errorAtTheEnd) {
    throw new Error(errorAtTheEnd.message);
  }

  return { updateUser };
}
