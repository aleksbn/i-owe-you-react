import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../services/apiPayments";
import { useUserData } from "../../context/UserDataProvider";

/**
 * A custom hook that fetches and returns the payments data for a given owingId and userData.
 *
 * @param {number} owingId - The ID of the owing to fetch payments for.
 * @return {Object} An object containing the following properties:
 *   - isLoading: A boolean indicating if the query is still loading.
 *   - payments: The fetched payments data, or null if no data was found.
 *   - count: The total count of payments, or null if no data was found.
 *   - error: Any error that occurred during the query.
 */
export function usePayments(owingId) {
  const { userData } = useUserData();
  const {
    isLoading,
    data: { data: payments, count } = {},
    error,
  } = useQuery({
    queryKey: ["payments", owingId],
    queryFn: () => getPayments({ userData, owingId }),
  });

  return { isLoading, payments, count, error };
}
