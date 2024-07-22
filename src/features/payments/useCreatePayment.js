import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment as createPaymentApi } from "../../services/apiPayments";
import toast from "react-hot-toast";

/**
 * A custom hook for creating a payment.
 *
 * @return {Object} An object containing the createPayment function and a boolean indicating if the creation is in progress.
 */
export function useCreatePayment() {
  const queryClient = useQueryClient();
  const { mutate: createPayment, isLoading: isCreating } = useMutation({
    mutationFn: createPaymentApi,
    /**
     * Executes when the mutation is successful.
     *
     * Displays a success toast message and invalidates the queries with the keys "owings", "owing", or "payments".
     *
     * @return {void}
     */
    onSuccess: () => {
      toast.success("Payment added successfully");
      queryClient.invalidateQueries({
        /**
         * A function that checks if the query key includes specific strings.
         *
         * @param {Object} query - The query object to check.
         * @return {boolean} Returns true if the query key includes "owings", "owing", or "payments".
         */
        predicate: (query) => {
          return ["owings", "owing", "payments"].includes(query.queryKey[0]);
        },
      });
    },
  });

  return { createPayment, isCreating };
}
