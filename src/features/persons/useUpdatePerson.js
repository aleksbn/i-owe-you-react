import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditPerson } from "../../services/apiPersons";
import toast from "react-hot-toast";

/**
 * Returns an object containing the state of the update person mutation and a function to update a person.
 *
 * @return {Object} An object with the following properties:
 *   - updatePerson: A function that takes a person object and updates a person.
 *   - isUpdating: A boolean indicating whether the update person mutation is currently in progress.
 */
export function useUpdatePerson() {
  const queryClient = useQueryClient();

  const { mutate: updatePerson, isLoading: isUpdating } = useMutation({
    mutationFn: createEditPerson,
    /**
     * Executes when the mutation is successful.
     *
     * Displays a success toast message and invalidates the queries with the keys "persons" or "person".
     *
     * @return {void}
     */
    onSuccess: () => {
      toast.success("Person updated");
      queryClient.invalidateQueries({
        /**
         * Checks if the query key of the given query object is either "persons" or "person".
         *
         * @param {Object} query - The query object.
         * @return {boolean} Returns true if the query key is either "persons" or "person", otherwise false.
         */
        predicate: (query) => {
          return ["persons", "person"].includes(query.queryKey[0]);
        },
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updatePerson, isUpdating };
}
