import { useQuery } from "@tanstack/react-query";
import { getPersons } from "../../services/apiPersons";

export function usePersons() {
	// const queryClient = useQueryClient();
	const {
		isLoading,
		data: { data: persons, count } = {},
		error,
	} = useQuery({
		queryKey: ["persons"],
		queryFn: getPersons,
	});

	return { isLoading, error, persons, count };
}
