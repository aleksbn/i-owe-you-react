import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditPerson } from "../../services/apiPersons";
import toast from "react-hot-toast";

export function useUpdatePerson() {
	const queryClient = useQueryClient();

	const { mutate: updatePerson, isLoading: isUpdating } = useMutation({
		mutationFn: createEditPerson,
		onSuccess: () => {
			toast.success("Person updated");
			queryClient.invalidateQueries({
				predicate: (query) => {
					return ["persons", "person"].includes(query.queryKey[0]);
				},
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { updatePerson, isUpdating };
}
