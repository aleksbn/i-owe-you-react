import supabase, { supabaseUrl } from "./supabase";

// SIGNUP
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
	await Promise.all([
		supabase.rpc("create_persons_table", { table_id }),
		supabase.rpc("create_owings_table", { table_id }),
		supabase.rpc("create_payments_table", { table_id }),
	]);

	// Return the user data and any errors
	return { data: data.user, error: null };
}

// LOGIN
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

// GET CURRENT USER
export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();

	if (!session.session) return null;

	return session.session;
}

// LOGOUT
export async function logout() {
	const { error } = supabase.auth.signOut();
	if (error) {
		throw new Error(error.message);
	}
}

// UPDATE USER
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
