import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";

/**
 * Custom hook for handling user logout.
 *
 * @return {Object} An object containing the `logout` function and the `isLoggingOut` boolean flag.
 * - `logout`: A function that triggers the logout mutation.
 * - `isLoggingOut`: A boolean flag indicating if the logout mutation is currently in progress.
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    /**
     * A function that handles the onSuccess behavior after logout.
     *
     */
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoggingOut };
}
