import { useParams } from "react-router-dom";
import { TeamDetailsByExternalId } from "../features/teams/components/TeamDetailsByExternalId";

const TeamDetailsByExternalIdPage = () => {
	const { leagueId, seasonYear, externalTeamId } = useParams<{
		leagueId: string;
		seasonYear: string;
		externalTeamId: string;
	}>();

	if (!leagueId) {
		return <div>Invalid league id</div>;
	}

	if (!seasonYear) {
		return <div>Invalid season year</div>;
	}

	if (!externalTeamId) {
		return <div>Invalid external team id</div>;
	}

	const leagueIdNumber = Number(leagueId);
	const seasonYearNumber = Number(seasonYear);
	const externalTeamIdNumber = Number(externalTeamId);

	if (
		isNaN(leagueIdNumber) ||
		isNaN(seasonYearNumber) ||
		isNaN(externalTeamIdNumber)
	) {
		return <div>Invalid league id or season year or external team id</div>;
	}

	return (
		<div>
			<h2>Redirecting to team details...</h2>
			<TeamDetailsByExternalId
				leagueId={leagueIdNumber}
				seasonYear={seasonYearNumber}
				externalTeamId={externalTeamIdNumber}
			/>
		</div>
	);
};

export default TeamDetailsByExternalIdPage;
