import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../services/apiPayments";
import { useUserData } from "../../context/UserDataProvider";

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
