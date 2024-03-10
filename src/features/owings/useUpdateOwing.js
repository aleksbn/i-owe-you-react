import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditOwing } from "../../services/apiOwings";
import toast from "react-hot-toast";

export function useUpdateOwing() {
	const queryClient = useQueryClient();

	const { mutate: updateOwing, isLoading: isUpdating } = useMutation({
		mutationFn: createEditOwing,
		onSuccess: () => {
			toast.success("Owing updated");
			queryClient.invalidateQueries({
				predicate: (query) => {
					return ["owings", "owing"].includes(query.queryKey[0]);
				},
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateOwing, isUpdating };
}
