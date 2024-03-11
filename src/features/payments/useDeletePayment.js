import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletePayment as deletePaymentApi } from "../../services/apiPayments";

export function useDeletePayment() {
	const queryClient = useQueryClient();

	const { mutate: deletePayment, isLoading: isDeleting } = useMutation({
		mutationFn: deletePaymentApi,
		onSuccess: () => {
			toast.success("Payment sucessfully deleted");
			queryClient.invalidateQueries({
				predicate: (query) => {
					return ["owings", "owing", "payments"].includes(query.queryKey[0]);
				},
			});
		},
	});

	return { isDeleting, deletePayment };
}
