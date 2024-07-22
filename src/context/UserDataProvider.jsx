import { useState } from "react";
import { supabaseUrl } from "../services/supabase";
import { createContext } from "react";
import { useContext } from "react";

const UserDataContext = createContext();

/**
 * UserDataProvider function to provide user data to the context.
 *
 * @param {Object} children - The child components to render within the context.
 * @return {JSX.Element} The context provider with user data and setter for children components.
 */
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

/**
 * A hook to access user data from the context.
 *
 * @return {type} The user data from the context.
 */
function useUserData() {
  const context = useContext(UserDataContext);
  if (!context)
    throw new Error("UserDataContext was used outside of UserDataProvider");
  return context;
}

export { UserDataProvider, useUserData };
