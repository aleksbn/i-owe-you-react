import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditOwing } from "../../services/apiOwings";
import toast from "react-hot-toast";

/**
 * Handles the success callback of the onSuccess function.
 * Displays a success toast message and invalidates the "owings" query.
 *
 * @return {void}
 */
export function useCreateOwing() {
  const queryClient = useQueryClient();

  const { mutate: createOwing, isLoading: isCreating } = useMutation({
    mutationFn: createEditOwing,
    /**
     * Handles the success callback of the onSuccess function.
     * Displays a success toast message and invalidates the "owings" query.
     *
     * @return {void}
     */
    onSuccess: () => {
      toast.success("Owing sucessfully created");
      queryClient.invalidateQueries({
        queryKey: ["owings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createOwing };
}
