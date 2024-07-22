import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePerson as deletePersonApi } from "../../services/apiPersons";
import toast from "react-hot-toast";

export function useDeletePerson() {
  const queryClient = useQueryClient();

  const { mutate: deletePerson, isLoading: isDeleting } = useMutation({
    mutationFn: deletePersonApi,
    /**
     * Executes a success callback after a person is successfully deleted.
     *
     * @return {void} No return value.
     */
    onSuccess: () => {
      toast.success("Person successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["persons"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePerson };
}
