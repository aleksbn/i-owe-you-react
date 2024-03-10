import { deleteOwing as deleteOwingApi } from "../../services/apiOwings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteOwing() {
	const queryClient = useQueryClient();

	const { mutate: deleteOwing, isLoading: isDeleting } = useMutation({
		mutationFn: deleteOwingApi,
		onSuccess: () => {
			toast.success("Owing successfully deleted");
			queryClient.invalidateQueries({
				queryKey: ["owings"],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteOwing };
}
