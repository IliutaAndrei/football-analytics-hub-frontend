import { Navigate } from "react-router-dom";
import { useTeamByExternalId } from "../hooks/useTeamByExternalId";

interface TeamDetailsByExternalIdProps {
	leagueId: number;
	seasonYear: number;
	externalTeamId: number;
}

export const TeamDetailsByExternalId = ({
	leagueId,
	seasonYear,
	externalTeamId,
}: TeamDetailsByExternalIdProps) => {
	const { data, isLoading, isError, error } = useTeamByExternalId(
		leagueId,
		seasonYear,
		externalTeamId,
	);

	if (isLoading) {
		return <p>Loading team details...</p>;
	}

	if (isError) {
		return <p>Error: {error?.message}</p>;
	}

	if (!data) {
		return <p>Team not found</p>;
	}

	return (
		<Navigate
			to={`/leagues/${leagueId}/seasons/${seasonYear}/teams/${data.id}`}
			replace
		/>
	);
};
