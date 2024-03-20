import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup } from "../../services/apiAuth";

export function useRegister() {
	const queryClient = useQueryClient();

	const { mutate: register, isLoading: isRegistering } = useMutation({
		mutationFn: signup,
		onSuccess: () => {
			toast.success("User successfully created");
			queryClient.invalidateQueries({
				queryKey: ["user"],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { register, isRegistering };
}
