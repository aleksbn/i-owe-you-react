import { useQuery } from "@tanstack/react-query";
import { getOwing } from "../../services/apiOwings";

/**
 * A custom hook that fetches and returns the owing data for a given owingId and userData.
 *
 * @param {number} owingId - The ID of the owing to fetch.
 * @param {string} userData - The user data to identify the owings table.
 * @return {Object} An object containing the following properties:
 *   - isLoading: A boolean indicating if the query is still loading.
 *   - owing: The fetched owing data, or null if no data was found.
 *   - error: Any error that occurred during the query.
 */
export function useOwing(owingId, userData) {
  const {
    isLoading,
    data: { data: owing } = {},
    error,
  } = useQuery({
    queryFn: () => getOwing({ id: owingId, userData }),
    queryKey: ["owing", owingId],
    retry: false,
  });

  return { isLoading, owing, error };
}
