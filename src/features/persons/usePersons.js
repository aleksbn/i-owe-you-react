import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPersons } from "../../services/apiPersons";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utilities/constants";
import { useUserData } from "../../context/UserDataProvider";

export function usePersons() {
	const { userData } = useUserData();
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// FILTER
	const nickname = searchParams.get("nickname");

	// PAGINATION
	const page = !searchParams.get("page") ? 1 : searchParams.get("page");

	const {
		isLoading,
		data: { data: persons, count } = {},
		error,
	} = useQuery({
		queryKey: ["persons", page, nickname],
		queryFn: () => getPersons({ page, nickname, userData }),
	});

	// PRE-FETCHING
	if (page < Math.ceil(count / PAGE_SIZE)) {
		queryClient.prefetchQuery({
			queryKey: ["persons", +page + 1],
			queryFn: () => getPersons({ page: +page + 1, userData }),
		});
	}

	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ["persons", +page - 1],
			queryFn: () => getPersons({ page: +page - 1, userData }),
		});
	}

	return { isLoading, error, persons, count };
}
