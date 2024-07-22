import { useQuery } from "@tanstack/react-query";
import { getPerson } from "../../services/apiPersons";
import { useUserData } from "../../context/UserDataProvider";

/**
 * Custom hook that fetches a person's data based on the provided personId.
 *
 * @param {number} personId - The ID of the person.
 * @return {Object} An object containing the following properties:
 *   - isLoading: A boolean indicating if the query is still loading.
 *   - person: The fetched person data, or null if no data was found.
 *   - error: Any error that occurred during the query.
 */
export function usePerson(personId) {
  const { userData } = useUserData();
  const {
    isLoading,
    data: { data: person } = {},
    error,
  } = useQuery({
    queryFn: () => getPerson({ id: personId, userData }),
    queryKey: ["person", personId],
    retry: false,
  });

  return { isLoading, person, error };
}
