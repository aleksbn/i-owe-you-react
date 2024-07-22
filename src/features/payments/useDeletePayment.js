import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletePayment as deletePaymentApi } from "../../services/apiPayments";

/**
 * Returns an object containing the state of the delete payment mutation and a function to delete a payment.
 *
 * @return {Object} An object with the following properties:
 *   - isDeleting: A boolean indicating whether the delete mutation is currently in progress.
 *   - deletePayment: A function that takes a payment ID and deletes the corresponding payment.
 */
export function useDeletePayment() {
  const queryClient = useQueryClient();

  const { mutate: deletePayment, isLoading: isDeleting } = useMutation({
    mutationFn: deletePaymentApi,
    /**
     * A function that executes when the mutation is successful.
     *
     * @return {void} Executes a success toast message and invalidates queries based on query key inclusion.
     */
    onSuccess: () => {
      toast.success("Payment sucessfully deleted");
      queryClient.invalidateQueries({
        /**
         * Checks if the given query key is included in the array of query keys.
         *
         * @param {Object} query - The query object.
         * @return {boolean} Returns true if the query key is included in the array of query keys, otherwise false.
         */
        predicate: (query) => {
          return ["owings", "owing", "payments"].includes(query.queryKey[0]);
        },
      });
    },
  });

  return { isDeleting, deletePayment };
}
