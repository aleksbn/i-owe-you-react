import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOwings } from "../../services/apiOwings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utilities/constants";
import { useUserData } from "../../context/UserDataProvider";

/**
 * Custom hook that fetches owings data based on specified filters and sorting options.
 *
 * @param {number} total - Optional total number of owings. If not provided, the hook will attempt to determine it.
 * @return {Object} An object containing the loading state, any errors, the fetched owings data, and the count of results.
 */
export function useOwings(total = null) {
  const { userData } = useUserData();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "movementDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page")
    ? !total
      ? 1
      : 0
    : searchParams.get("page");

  // QUERY
  const {
    isLoading,
    data: { data: owings, count } = {},
    error,
  } = useQuery({
    queryKey: ["owings", filter, sortBy, +page],
    queryFn: () => getOwings({ filter, sortBy, page, userData }),
  });

  // PRE-FETCHING
  if (page < Math.ceil(count / PAGE_SIZE)) {
    queryClient.prefetchQuery({
      queryKey: ["owings", filter, sortBy, +page + 1],
      queryFn: () => getOwings({ filter, sortBy, page: +page + 1, userData }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["owings", filter, sortBy, +page - 1],
      queryFn: () => getOwings({ filter, sortBy, page: +page - 1, userData }),
    });
  }

  return { isLoading, error, owings, count };
}
