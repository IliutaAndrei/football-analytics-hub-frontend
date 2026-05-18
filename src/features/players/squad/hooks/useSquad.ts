import { useQuery } from "@tanstack/react-query";
import { getSquadPlayersByTeamId } from "../services/squadService";

export const useSquad = (teamId: number) => {
	return useQuery({
		queryKey: ["squad", teamId],
		queryFn: () => getSquadPlayersByTeamId(teamId),
	});
};
