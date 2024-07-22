import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup } from "../../services/apiAuth";

/**
 * Custom hook for registering a user.
 *
 * @param {Function} setUserData - Callback function to set the user data.
 * @return {Object} An object containing the `register` function and the `isRegistering` loading state.
 */
export function useRegister(setUserData) {
  const queryClient = useQueryClient();

  const { mutate: register, isLoading: isRegistering } = useMutation({
    mutationFn: signup,
    /**
     * Handles the success callback of the registration process.
     *
     * @param {Object} data - The data returned from the registration API.
     * @return {void} This function does not return anything.
     */
    onSuccess: ({ data }) => {
      toast.success("User successfully created");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      setUserData(data.id.split("-").join(""));
    },
    onError: (err) => toast.error(err.message),
  });

  return { register, isRegistering };
}
