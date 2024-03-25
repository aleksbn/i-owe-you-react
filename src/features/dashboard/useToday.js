import { useQuery } from "@tanstack/react-query";
import { useUserData } from "../../context/UserDataProvider";
import { getTodayPayments } from "../../services/apiPayments";

export function useToday() {
	const { userData } = useUserData();
	const { isLoading: isLoadingToday, data } = useQuery({
		queryFn: () => getTodayPayments({ userData }),
		queryKey: ["today-activity"],
	});

	return { isLoadingToday, data };
}
