import { useQuery } from "@tanstack/react-query";
import { getPerson } from "../../services/apiPersons";

export function usePerson(personId) {
	const {
		isLoading,
		data: { data: person } = {},
		error,
	} = useQuery({
		queryFn: () => getPerson(personId),
		queryKey: ["person", personId],
		retry: false,
	});

	return { isLoading, person, error };
}
