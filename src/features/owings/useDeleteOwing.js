import { deleteOwing as deleteOwingApi } from "../../services/apiOwings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/**
 * Returns an object containing the state of the delete owing mutation and a function to delete an owing.
 *
 * @return {Object} An object with the following properties:
 *   - isDeleting: A boolean indicating whether the delete mutation is currently in progress.
 *   - deleteOwing: A function that takes an owing ID and deletes the corresponding owing.
 */
export function useDeleteOwing() {
  const queryClient = useQueryClient();

  const { mutate: deleteOwing, isLoading: isDeleting } = useMutation({
    mutationFn: deleteOwingApi,
    /**
     * A function that handles the success scenario after deleting an owing.
     */
    onSuccess: () => {
      toast.success("Owing successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["owings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteOwing };
}
