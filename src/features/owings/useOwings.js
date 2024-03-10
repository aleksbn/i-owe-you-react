import { useQuery } from "@tanstack/react-query";
import { getOwings } from "../../services/apiOwings";

export function useOwings() {
	const {
		isLoading,
		data: { data: owings, count } = {},
		error,
	} = useQuery({
		queryKey: ["owings"],
		queryFn: getOwings,
	});

	return { isLoading, error, owings, count };
}
