import { useQuery } from "@tanstack/react-query";
import type { Team } from "../types/team.types";

export const useTeamByExternalId = (
	leagueId: number,
	seasonYear: number,
	externalTeamId: number,
) => {
	return useQuery<Team>({
		queryKey: ["team-by-external-id", leagueId, seasonYear, externalTeamId],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:8080/api/leagues/${leagueId}/seasons/${seasonYear}/teams/by-external-id/${externalTeamId}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch team by external id");
			}
			return response.json();
		},
		enabled: !!leagueId && !!seasonYear && !!externalTeamId,
	});
};
