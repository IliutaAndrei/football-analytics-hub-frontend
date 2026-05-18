import { useParams, Link } from "react-router-dom";
import { LeaguesList } from "../features/leagues/components/LeaguesList";

const LeaguesPage = () => {
	const { countryCode } = useParams<{ countryCode: string }>();

	return (
		<div>
			<div className="card bg-gradient-to-br from-primary-50 via-white to-primary-50 mb-8">
				<Link
					to="/countries"
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
					<span>Back to Countries</span>
				</Link>
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
						<span className="text-4xl">🏆</span>
					</div>
					<div>
						<h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
							Football Leagues
						</h1>
						<p className="text-gray-600">
							Explore competitions and tournaments
						</p>
					</div>
				</div>
			</div>
			<LeaguesList countryCode={countryCode || ""} />
		</div>
	);
};

export default LeaguesPage;
