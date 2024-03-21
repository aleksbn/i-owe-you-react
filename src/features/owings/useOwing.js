import { useQuery } from "@tanstack/react-query";
import { getOwing } from "../../services/apiOwings";

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
