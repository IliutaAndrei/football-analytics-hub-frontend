import { useParams, useNavigate } from "react-router-dom";
import { StandingsList } from "../features/standings/components/StandingsList";

const StandingsPage = () => {
	const { leagueId, seasonYear } = useParams<{
		leagueId: string;
		seasonYear: string;
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
					<span>Back to Seasons</span>
				</button>
				<h1 className="text-4xl font-display font-bold text-gray-900 mb-3">
					League Standings
				</h1>
				<p className="text-lg text-gray-600">
					Season {seasonYear} - Complete league table with team
					rankings and statistics
				</p>
			</div>
			<StandingsList
				leagueId={Number(leagueId)}
				seasonYear={Number(seasonYear)}
			/>
		</div>
	);
};

export default StandingsPage;
