import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPersons } from "../../services/apiPersons";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utilities/constants";
import { useUserData } from "../../context/UserDataProvider";

/**
 * Custom hook for managing persons data including filtering, pagination, and pre-fetching.
 *
 * @param {number} total - The total number of persons.
 * @return {Object} An object containing loading status, error status, persons data, and total count.
 */
export function usePersons(total = null) {
  const { userData } = useUserData();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const nickname = searchParams.get("nickname");

  // PAGINATION
  const page = !searchParams.get("page")
    ? !total
      ? 1
      : 0
    : searchParams.get("page");

  const {
    isLoading,
    data: { data: persons, count } = {},
    error,
  } = useQuery({
    queryKey: ["persons", nickname, +page],
    queryFn: () => getPersons({ page, nickname, userData }),
  });

  // PRE-FETCHING
  if (page < Math.ceil(count / PAGE_SIZE)) {
    queryClient.prefetchQuery({
      queryKey: ["persons", nickname, +page + 1],
      queryFn: () => getPersons({ page: +page + 1, nickname, userData }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["persons", nickname, +page - 1],
      queryFn: () => getPersons({ page: +page - 1, nickname, userData }),
    });
  }

  return { isLoading, error, persons, count };
}
