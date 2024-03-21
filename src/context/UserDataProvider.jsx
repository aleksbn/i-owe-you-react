import { useState } from "react";
import { supabaseUrl } from "../services/supabase";
import { createContext } from "react";
import { useContext } from "react";

const UserDataContext = createContext();

/* eslint-disable react/prop-types */
function UserDataProvider({ children }) {
	const localStorageUserKey = `sb-${
		supabaseUrl.split("/")[2].split(".")[0]
	}-auth-token`;
	const user = JSON.parse(localStorage.getItem(localStorageUserKey)) ?? null;
	const [userData, setUserData] = useState(user?.user?.id?.split("-").join(""));

	return (
		<UserDataContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserDataContext.Provider>
	);
}

function useUserData() {
	const context = useContext(UserDataContext);
	if (!context)
		throw new Error("UserDataContext was used outside of UserDataProvider");
	return context;
}

export { UserDataProvider, useUserData };
