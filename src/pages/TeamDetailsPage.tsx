import { useParams, useNavigate } from "react-router-dom";
import { TeamDetails } from "../features/teams/components/TeamDetails";

const TeamDetailsPage = () => {
	const { leagueId, seasonYear, teamId } = useParams<{
		leagueId: string;
		seasonYear: string;
		teamId: string;
	}>();
	const navigate = useNavigate();

	return (
		<div>
			<div className="mb-8">
				<button
					onClick={() => navigate(-1)}
					className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-4 transition-colors duration-200"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					<span>Back to Teams</span>
				</button>
			</div>
			<TeamDetails
				leagueId={Number(leagueId)}
				seasonYear={Number(seasonYear)}
				teamId={Number(teamId)}
			/>
		</div>
	);
};

export default TeamDetailsPage;
