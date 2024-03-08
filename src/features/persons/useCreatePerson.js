import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditPerson } from "../../services/apiPersons";

export function useCreatePerson() {
	const queryClient = useQueryClient();

	const { mutate: createPerson, isLoading: isCreating } = useMutation({
		mutationFn: createEditPerson,
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
