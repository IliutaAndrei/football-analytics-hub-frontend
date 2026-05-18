import { useStatistics } from "../hooks/useStatistics";

interface StatisticsListProps {
	leagueId: number;
	seasonYear: number;
	teamId: number;
}

const StatCard = ({
	label,
	value,
	subLabel,
	icon,
	gradient,
}: {
	label: string;
	value: string | number;
	subLabel?: string;
	icon: string;
	gradient: string;
}) => (
	<div className="card hover:shadow-xl transition-all duration-300 hover:scale-105 group">
		<div className="flex items-start gap-4">
			<div
				className={`w-12 h-12 sm:w-14 sm:h-14 ${gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
			>
				<span className="text-xl sm:text-2xl">{icon}</span>
			</div>
			<div className="flex-1 min-w-0">
				<p className="text-xs sm:text-sm text-gray-600 mb-1">{label}</p>
				<p className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 break-words">
					{value}
				</p>
				{subLabel && (
					<p className="text-xs text-gray-500 mt-1 break-words">
						{subLabel}
					</p>
				)}
			</div>
		</div>
	</div>
);

const StatRow = ({
	label,
	home,
	away,
	total,
}: {
	label: string;
	home: number | string;
	away: number | string;
	total: number | string;
}) => (
	<div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 px-2 -mx-2 rounded gap-2">
		<span className="text-gray-700 font-medium">{label}</span>
		<div className="flex gap-4 sm:gap-6 text-sm font-medium flex-wrap">
			<span className="text-gray-600">
				H: <span className="text-blue-600 font-semibold">{home}</span>
			</span>
			<span className="text-gray-600">
				A: <span className="text-green-600 font-semibold">{away}</span>
			</span>
			{total !== "-" && (
				<span className="text-primary-600 font-bold">T: {total}</span>
			)}
		</div>
	</div>
);

export const StatisticsList = ({
	leagueId,
	seasonYear,
	teamId,
}: StatisticsListProps) => {
	const { data, isLoading, error, isError } = useStatistics(
		leagueId,
		seasonYear,
		teamId,
	);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
					<p className="text-gray-600">Loading statistics...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="card bg-red-50 border-red-200">
				<p className="text-red-600">Error: {error?.message}</p>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="card text-center py-12">
				<p className="text-gray-600 text-lg">No statistics available</p>
			</div>
		);
	}

	const formLetters = data.form.split("").slice(-5);
	const getFormColor = (letter: string) => {
		if (letter === "W") return "bg-green-500";
		if (letter === "D") return "bg-yellow-500";
		if (letter === "L") return "bg-red-500";
		return "bg-gray-400";
	};

	return (
		<div className="space-y-6">
			<div className="card bg-gradient-to-br from-primary-50 via-white to-primary-50 hover:shadow-xl transition-shadow duration-300">
				<div className="space-y-4">
					<div>
						<h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900 break-words">
							{data.team.name}
						</h2>
						<p className="text-sm sm:text-base text-gray-600 break-words">
							{data.league.name} • Season {data.league.season}
						</p>
					</div>
					<div className="pt-4 border-t border-gray-200">
						<p className="text-sm text-gray-600 mb-3">
							Recent Form (Last 5)
						</p>
						<div className="flex gap-2 flex-wrap">
							{formLetters.map((letter, index) => (
								<div
									key={index}
									className={`w-10 h-10 ${getFormColor(letter)} rounded-lg flex items-center justify-center text-white font-bold shadow-md transform hover:scale-110 transition-transform duration-200`}
								>
									{letter}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				<StatCard
					label="Goals Scored"
					value={data.goal.forGoals.total.total}
					subLabel={`Avg: ${data.goal.forGoals.average.total}`}
					icon="⚽"
					gradient="bg-gradient-to-br from-green-400 to-green-600"
				/>
				<StatCard
					label="Goals Against"
					value={data.goal.againstGoals.total.total}
					subLabel={`Avg: ${data.goal.againstGoals.average.total}`}
					icon="🥅"
					gradient="bg-gradient-to-br from-red-400 to-red-600"
				/>
				<StatCard
					label="Goal Difference"
					value={
						data.goal.forGoals.total.total -
						data.goal.againstGoals.total.total
					}
					icon="📊"
					gradient="bg-gradient-to-br from-blue-400 to-blue-600"
				/>
				<StatCard
					label="Clean Sheets"
					value={data.cleanSheet.total}
					subLabel={`H: ${data.cleanSheet.home} A: ${data.cleanSheet.away}`}
					icon="🛡️"
					gradient="bg-gradient-to-br from-cyan-400 to-cyan-600"
				/>
				<StatCard
					label="Failed to Score"
					value={data.failedToScore.total}
					subLabel={`H: ${data.failedToScore.home} A: ${data.failedToScore.away}`}
					icon="❌"
					gradient="bg-gradient-to-br from-orange-400 to-orange-600"
				/>
				<StatCard
					label="Penalties Scored"
					value={`${data.penalty.scored.total}`}
					subLabel={`${data.penalty.scored.percentage} • Missed: ${data.penalty.missed.total}`}
					icon="🎯"
					gradient="bg-gradient-to-br from-purple-400 to-purple-600"
				/>
			</div>

			<div className="card hover:shadow-lg transition-shadow duration-300">
				<h3 className="text-base sm:text-lg font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
					<span className="text-xl sm:text-2xl">📈</span>
					Matches
				</h3>
				<StatRow
					label="Played"
					home={data.fixture.played.home}
					away={data.fixture.played.away}
					total={data.fixture.played.total}
				/>
				<StatRow
					label="Wins"
					home={data.fixture.wins.home}
					away={data.fixture.wins.away}
					total={data.fixture.wins.total}
				/>
				<StatRow
					label="Draws"
					home={data.fixture.draws.home}
					away={data.fixture.draws.away}
					total={data.fixture.draws.total}
				/>
				<StatRow
					label="Losses"
					home={data.fixture.loses.home}
					away={data.fixture.loses.away}
					total={data.fixture.loses.total}
				/>
			</div>

			<div className="card hover:shadow-lg transition-shadow duration-300">
				<h3 className="text-base sm:text-lg font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
					<span className="text-xl sm:text-2xl">🏆</span>
					Biggest Results
				</h3>
				<StatRow
					label="Wins"
					home={data.biggest.wins.home}
					away={data.biggest.wins.away}
					total="-"
				/>
				<StatRow
					label="Losses"
					home={data.biggest.loses.home}
					away={data.biggest.loses.away}
					total="-"
				/>
				<StatRow
					label="Goals For"
					home={data.biggest.goals.forGoals.home}
					away={data.biggest.goals.forGoals.away}
					total="-"
				/>
				<StatRow
					label="Goals Against"
					home={data.biggest.goals.againstGoals.home}
					away={data.biggest.goals.againstGoals.away}
					total="-"
				/>
			</div>

			<div className="card hover:shadow-lg transition-shadow duration-300">
				<h3 className="text-base sm:text-lg font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
					<span className="text-xl sm:text-2xl">⚙️</span>
					Most Used Formations
				</h3>
				<div className="space-y-2">
					{data.lineUps.map((lineUp) => (
						<div
							key={lineUp.formation}
							className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 px-4 border-l-4 border-primary-500 bg-gradient-to-r from-primary-50 to-transparent hover:from-primary-100 transition-all duration-200 rounded-r"
						>
							<span className="font-bold text-gray-900 text-base sm:text-lg">
								{lineUp.formation}
							</span>
							<span className="text-xs sm:text-sm bg-primary-600 text-white px-3 py-1 rounded-full font-semibold self-start sm:self-auto">
								{lineUp.played} matches
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
