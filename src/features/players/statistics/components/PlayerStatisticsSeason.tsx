import { usePlayerStatistics } from "../hooks/usePlayerStatistics";
import { usePlayerProfile } from "../../profile/hooks/usePlayerProfile";

interface PlayerStatisticsSeasonProps {
	playerId: number;
}

const StatCard = ({
	title,
	value,
	subtitle,
	icon,
	gradient,
}: {
	title: string;
	value: number | string;
	subtitle?: string;
	icon: React.ReactNode;
	gradient: string;
}) => (
	<div className="card hover:shadow-xl transition-all duration-300">
		<div className="flex items-start gap-4">
			<div
				className={`w-12 h-12 ${gradient} rounded-lg flex items-center justify-center shadow-md flex-shrink-0`}
			>
				{icon}
			</div>
			<div className="flex-1">
				<p className="text-sm text-gray-600 mb-1">{title}</p>
				<p className="text-3xl font-bold text-gray-900">{value}</p>
				{subtitle && (
					<p className="text-xs text-gray-500 mt-1 whitespace-pre-line">
						{subtitle}
					</p>
				)}
			</div>
		</div>
	</div>
);

const StatRow = ({
	label,
	value,
}: {
	label: string;
	value: number | string | null;
}) => (
	<div className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
		<span className="text-gray-600">{label}</span>
		<span className="font-semibold text-gray-900">{value ?? 0}</span>
	</div>
);

export const PlayerStatisticsSeason = ({
	playerId,
}: PlayerStatisticsSeasonProps) => {
	const { data, isError, isLoading } = usePlayerStatistics(playerId);
	const { data: profileData } = usePlayerProfile(playerId);

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

	if (isError || !data) {
		return (
			<div className="card text-center py-12">
				<svg
					className="mx-auto h-12 w-12 text-gray-400 mb-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
				<p className="text-gray-700 text-lg font-semibold mb-2">
					No Season Statistics Available
				</p>
				<p className="text-gray-600 text-sm mb-4">
					This player doesn't have any recorded statistics for the
					current season. They may not have appeared in any matches
					yet, or their data might not be available.
				</p>
				{profileData && (
					<button
						onClick={() => window.history.back()}
						className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
					>
						<svg
							className="w-4 h-4"
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
						Back to Profile
					</button>
				)}
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="card bg-gradient-to-br from-primary-50 to-white">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
					<div className="flex items-center gap-4">
						{profileData && (
							<>
								<img
									src={profileData.photo}
									alt={profileData.name}
									className="w-20 h-20 rounded-full object-cover shadow-lg border-2 border-white"
								/>
								<div>
									<h2 className="text-2xl font-display font-bold text-gray-900">
										{profileData.name}
									</h2>
									<p className="text-gray-600">
										{profileData.position} •{" "}
										{profileData.nationality}
									</p>
								</div>
							</>
						)}
					</div>
					<div className="flex items-center gap-4 md:border-l-2 md:border-gray-200 md:pl-6">
						<img
							src={data.team.logo}
							alt={data.team.name}
							className="w-16 h-16 object-contain"
						/>
						<div>
							<h3 className="text-xl font-display font-bold text-gray-900">
								{data.team.name}
							</h3>
							<p className="text-sm text-gray-600">
								{data.league.name} • Season {data.league.season}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<StatCard
					title="Appearances"
					value={data.games.appearences ?? 0}
					subtitle={`${data.games.minutes ?? 0} minutes played`}
					gradient="bg-gradient-to-br from-blue-400 to-blue-600"
					icon={
						<svg
							className="w-6 h-6 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					}
				/>
				<StatCard
					title="Goals & Assists"
					value={`${data.goals.total ?? 0} / ${data.goals.assists ?? 0}`}
					subtitle={`${data.shots.on ?? 0}/${data.shots.total ?? 0} shots on target`}
					gradient="bg-gradient-to-br from-green-400 to-green-600"
					icon={
						<svg
							className="w-6 h-6 text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					}
				/>
				<StatCard
					title="Discipline"
					value={`${data.cards.yellow ?? 0} / ${data.cards.red ?? 0}`}
					subtitle={`Yellow / Red cards\n${data.fouls.committed ?? 0} fouls committed`}
					gradient="bg-gradient-to-br from-yellow-400 to-red-600"
					icon={
						<svg
							className="w-6 h-6 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					}
				/>
				<StatCard
					title="Pass Accuracy"
					value={`${data.passes.accuracy ?? 0}%`}
					subtitle={`${data.passes.total ?? 0} total passes\n${data.passes.key ?? 0} key passes`}
					gradient="bg-gradient-to-br from-purple-400 to-purple-600"
					icon={
						<svg
							className="w-6 h-6 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
							/>
						</svg>
					}
				/>
			</div>

			<div className="grid lg:grid-cols-3 gap-6">
				<div className="card hover:shadow-lg transition-shadow">
					<h3 className="text-lg font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
						<svg
							className="w-5 h-5 text-primary-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
						Attacking
					</h3>
					<StatRow label="Total Shots" value={data.shots.total} />
					<StatRow label="Shots on Target" value={data.shots.on} />
					<StatRow label="Goals Scored" value={data.goals.total} />
					<StatRow label="Assists" value={data.goals.assists} />
					<StatRow
						label="Dribbles Success"
						value={`${data.dribbles.success ?? 0}/${data.dribbles.attempts ?? 0}`}
					/>
				</div>

				<div className="card hover:shadow-lg transition-shadow">
					<h3 className="text-lg font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
						<svg
							className="w-5 h-5 text-primary-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
							/>
						</svg>
						Defending
					</h3>
					<StatRow label="Tackles" value={data.tackles.total} />
					<StatRow label="Blocks" value={data.tackles.blocks} />
					<StatRow
						label="Interceptions"
						value={data.tackles.interceptions}
					/>
					<StatRow
						label="Duels Won"
						value={`${data.duels.won ?? 0}/${data.duels.total ?? 0}`}
					/>
					<StatRow
						label="Fouls Committed"
						value={data.fouls.committed}
					/>
				</div>

				<div className="card hover:shadow-lg transition-shadow">
					<h3 className="text-lg font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
						<svg
							className="w-5 h-5 text-primary-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
						Match Info
					</h3>
					<StatRow
						label="Appearances"
						value={data.games.appearences}
					/>
					<StatRow
						label="Minutes Played"
						value={data.games.minutes}
					/>
					<StatRow
						label="Substituted In"
						value={data.substitutes.in}
					/>
					<StatRow
						label="Substituted Out"
						value={data.substitutes.out}
					/>
					<StatRow label="On Bench" value={data.substitutes.bench} />
				</div>
			</div>

			{((data.goals.conceded ?? 0) > 0 ||
				(data.goals.saved ?? 0) > 0) && (
				<div className="card hover:shadow-lg transition-shadow bg-gradient-to-br from-cyan-50 to-white">
					<h3 className="text-lg font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
						<svg
							className="w-5 h-5 text-cyan-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
							/>
						</svg>
						Goalkeeper Stats
					</h3>
					<div className="grid sm:grid-cols-2 gap-4">
						<StatRow
							label="Goals Conceded"
							value={data.goals.conceded}
						/>
						<StatRow label="Saves" value={data.goals.saved} />
					</div>
				</div>
			)}
		</div>
	);
};
