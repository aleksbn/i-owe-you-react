import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin(setUserData) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    /**
     * A function to handle success after login.
     *
     * @param {Object} user - The user object returned after successful login.
     * @return {void} No return value.
     */
    onSuccess: (user) => {
      queryClient.setQueryData("user", user);
      setUserData(user.user.id.split("-").join(""));
      navigate("/welcome");
    },
    /**
     * Handles the error case when the provided email or password are incorrect.
     *
     * @return {void} This function does not return anything.
     */
    onError: () => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoggingIn };
}
