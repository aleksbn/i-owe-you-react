import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditPerson } from "../../services/apiPersons";

/**
 * Returns an object containing the state of the create person mutation and a function to create a new person.
 *
 * @return {Object} An object with the following properties:
 *   - createPerson: A function that takes a person object and creates a new person.
 *   - isCreating: A boolean indicating whether the create person mutation is currently in progress.
 */
export function useCreatePerson() {
  const queryClient = useQueryClient();

  const { mutate: createPerson, isLoading: isCreating } = useMutation({
    mutationFn: createEditPerson,
    /**
     * Executes when the mutation is successfully completed.
     *
     * Displays a success toast message indicating that a new person has been created.
     * Invalidates the "persons" query in the queryClient, triggering a refetch of the data.
     *
     * @return {void}
     */
    onSuccess: () => {
      toast.success("New person created");
      queryClient.invalidateQueries({
        queryKey: ["persons"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createPerson, isCreating };
}
