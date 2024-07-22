import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

/**
 * Returns an object containing the `updateUser` function and the `isUpdating` boolean indicating whether the user is currently being updated.
 *
 * @return {Object} An object with the following properties:
 *   - `updateUser` (function): A function that takes a user object and updates the current user.
 *   - `isUpdating` (boolean): A boolean indicating whether the user update operation is currently in progress.
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    /**
     * Handles the success callback of the update user mutation.
     *
     * This function displays a success toast message and invalidates the user query in the query client.
     *
     * @return {void} This function does not return anything.
     */
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
