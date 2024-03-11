import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment as createPaymentApi } from "../../services/apiPayments";
import toast from "react-hot-toast";

export function useCreatePayment() {
	const queryClient = useQueryClient();
	const { mutate: createPayment, isLoading: isCreating } = useMutation({
		mutationFn: createPaymentApi,
		onSuccess: () => {
			toast.success("Payment added successfully");
			queryClient.invalidateQueries({
				predicate: (query) => {
					return ["owings", "owing", "payments"].includes(query.queryKey[0]);
				},
			});
		},
	});

	return { createPayment, isCreating };
}
