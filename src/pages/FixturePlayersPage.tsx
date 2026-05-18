import { useParams, useNavigate } from "react-router-dom";
import { FixturePlayers } from "../features/fixtures/players/components/FixturePlayers";

const FixturePlayersPage = () => {
	const { fixtureId } = useParams<{ fixtureId: string }>();
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
					<span>Back to Fixtures</span>
				</button>
				<h1 className="text-4xl font-display font-bold text-gray-900 mb-3">
					Match Players
				</h1>
				<p className="text-lg text-gray-600">
					Player performance and statistics
				</p>
			</div>
			<FixturePlayers fixtureId={Number(fixtureId)} />
		</div>
	);
};

export default FixturePlayersPage;
