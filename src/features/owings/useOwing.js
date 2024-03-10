import { useQuery } from "@tanstack/react-query";
import { getOwing } from "../../services/apiOwings";

export function useOwing(owingId) {
	const {
		isLoading,
		data: { data: owing } = {},
		error,
	} = useQuery({
		queryFn: () => getOwing(owingId),
		queryKey: ["owing", owingId],
		retry: false,
	});

	return { isLoading, owing, error };
}
