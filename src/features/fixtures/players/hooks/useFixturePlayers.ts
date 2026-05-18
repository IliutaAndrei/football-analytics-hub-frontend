import { useQuery } from "@tanstack/react-query";
import { getFixturePlayers } from "../services/fixturePlayersService";

export const useFixturePlayers = (fixtureId: number) => {
	return useQuery({
		queryKey: ["fixturePlayers", fixtureId],
		queryFn: () => getFixturePlayers(fixtureId),
	});
};
