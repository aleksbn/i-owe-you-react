import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

/**
 * Custom hook that retrieves the current user data and checks if the user is authenticated.
 *
 * @return {Object} An object containing the following properties:
 *   - isLoading: A boolean indicating if the user data is currently being loaded.
 *   - user: The user data object, or undefined if it is still being loaded.
 *   - isAuthenticated: A boolean indicating if the user is authenticated.
 */
export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.user?.role === "authenticated";

  return { isLoading, user, isAuthenticated };
}
