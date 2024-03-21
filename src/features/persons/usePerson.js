import { useQuery } from "@tanstack/react-query";
import { getPerson } from "../../services/apiPersons";
import { useUserData } from "../../context/UserDataProvider";

export function usePerson(personId) {
	const { userData } = useUserData();
	const {
		isLoading,
		data: { data: person } = {},
		error,
	} = useQuery({
		queryFn: () => getPerson({ id: personId, userData }),
		queryKey: ["person", personId],
		retry: false,
	});

	return { isLoading, person, error };
}
