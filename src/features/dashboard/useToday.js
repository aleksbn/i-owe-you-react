import { useQuery } from "@tanstack/react-query";
import { useUserData } from "../../context/UserDataProvider";
import { getTodayPayments } from "../../services/apiPayments";

/**
 * Custom hook that fetches today's payments based on the user's data.
 *
 * @return {Object} An object containing the loading state and the fetched data.
 *   - isLoadingToday {boolean} Indicates if the data is currently being fetched.
 *   - data {Array} The fetched payments.
 */
export function useToday() {
  const { userData } = useUserData();
  const { isLoading: isLoadingToday, data } = useQuery({
    queryFn: () => getTodayPayments({ userData }),
    queryKey: ["today-activity"],
  });

  return { isLoadingToday, data };
}
