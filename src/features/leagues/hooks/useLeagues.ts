import { useQuery } from "@tanstack/react-query";
import { getLeaguesByCountryCode } from "../services/leaguesService";

export const useLeagues = (countryCode: string) => {
	return useQuery({
		queryKey: ["leagues", countryCode],
		queryFn: () => getLeaguesByCountryCode(countryCode),
	});
};
