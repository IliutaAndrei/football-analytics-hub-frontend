import { useParams, useNavigate } from "react-router-dom";
import { StatisticsList } from "../features/statistics/components/StatisticsList";

const StatisticsPage = () => {
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
					<span>Back to Team Details</span>
				</button>
				<h1 className="text-4xl font-display font-bold text-gray-900 mb-3">
					Team Statistics
				</h1>
				<p className="text-lg text-gray-600">
					Season {seasonYear} - Comprehensive performance metrics and
					analysis
				</p>
			</div>
			<StatisticsList
				leagueId={Number(leagueId)}
				seasonYear={Number(seasonYear)}
				teamId={Number(teamId)}
			/>
		</div>
	);
};

export default StatisticsPage;
