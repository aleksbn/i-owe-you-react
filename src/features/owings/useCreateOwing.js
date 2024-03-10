import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditOwing } from "../../services/apiOwings";
import toast from "react-hot-toast";

export function useCreateOwing() {
	const queryClient = useQueryClient();

	const { mutate: createOwing, isLoading: isCreating } = useMutation({
		mutationFn: createEditOwing,
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
