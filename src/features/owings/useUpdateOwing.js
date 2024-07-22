import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditOwing } from "../../services/apiOwings";
import toast from "react-hot-toast";

/**
 * A custom hook for updating an owing.
 *
 * @return {Object} An object containing the updateOwing function and a boolean indicating if the update is in progress.
 */
export function useUpdateOwing() {
  const queryClient = useQueryClient();

  const { mutate: updateOwing, isLoading: isUpdating } = useMutation({
    mutationFn: createEditOwing,
    /**
     * Executes when the mutation is successful.
     *
     * Displays a success toast message and invalidates the queries with the keys "owings" or "owing".
     *
     * @return {void}
     */
    onSuccess: () => {
      toast.success("Owing updated");
      queryClient.invalidateQueries({
        /**
         * Checks if the given query key is either "owings" or "owing".
         *
         * @param {Object} query - The query object.
         * @return {boolean} Returns true if the query key is "owings" or "owing", false otherwise.
         */
        predicate: (query) => {
          return ["owings", "owing"].includes(query.queryKey[0]);
        },
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateOwing, isUpdating };
}
