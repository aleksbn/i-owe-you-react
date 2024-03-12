import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPersons } from "../../services/apiPersons";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utilities/constants";

export function usePersons() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// PAGINATION
	const page = !searchParams.get("page") ? 1 : searchParams.get("page");

	const {
		isLoading,
		data: { data: persons, count } = {},
		error,
	} = useQuery({
		queryKey: ["persons", page],
		queryFn: () => getPersons({ page }),
	});

	// PRE-FETCHING
	if (page < Math.ceil(count / PAGE_SIZE)) {
		queryClient.prefetchQuery({
			queryKey: ["persons", +page + 1],
			queryFn: () => getPersons({ page: +page + 1 }),
		});
	}

	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ["persons", +page - 1],
			queryFn: () => getPersons({ page: +page - 1 }),
		});
	}

	return { isLoading, error, persons, count };
}
