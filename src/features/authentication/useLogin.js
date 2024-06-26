import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin(setUserData) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: login, isLoading: isLoggingIn } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: (user) => {
			queryClient.setQueryData("user", user);
			setUserData(user.user.id.split("-").join(""));
			navigate("/welcome");
		},
		onError: () => {
			toast.error("Provided email or password are incorrect");
		},
	});

	return { login, isLoggingIn };
}
