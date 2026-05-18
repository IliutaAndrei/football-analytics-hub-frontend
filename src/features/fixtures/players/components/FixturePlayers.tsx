import { useFixturePlayers } from "../hooks/useFixturePlayers";
import type { PlayerStats } from "../types/fixtures.players.types";
import { useState } from "react";

interface FixturePlayersProps {
	fixtureId: number;
}

const StatRow = ({
	label,
	value,
}: {
	label: string;
	value: number | string | null;
}) => (
	<div className="flex justify-between py-2 text-sm">
		<span className="text-gray-600">{label}</span>
		<span className="font-semibold text-gray-900">{value ?? 0}</span>
	</div>
);

export const FixturePlayers = ({ fixtureId }: FixturePlayersProps) => {
	const { data, isLoading, error, isError } = useFixturePlayers(fixtureId);
	const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(
		null,
	);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
					<p className="text-gray-600">Loading players...</p>
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

	if (!data || !data.response || data.response.length === 0) {
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
						d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
					/>
				</svg>
				<p className="text-gray-700 text-lg font-semibold mb-2">
					No player statistics available
				</p>
				<p className="text-gray-600 text-sm">
					Player statistics are only available for completed matches
				</p>
			</div>
		);
	}

	const homeTeam = data.response[0];
	const awayTeam = data.response[1];

	const renderPlayerCard = (playerData: PlayerStats, teamColor: string) => {
		const stats = playerData.statistics[0];
		const isSelected = selectedPlayerId === playerData.player.id;
		const bgColor = teamColor === "blue" ? "bg-blue-100" : "bg-green-100";
		const hoverColor =
			teamColor === "blue" ? "hover:bg-blue-50" : "hover:bg-green-50";

		return (
			<div key={playerData.player.id} className="space-y-3">
				<button
					onClick={() =>
						setSelectedPlayerId(
							isSelected ? null : playerData.player.id,
						)
					}
					className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
						isSelected ? `${bgColor} shadow-md` : hoverColor
					}`}
				>
					<div className="flex items-center gap-3">
						<img
							src={playerData.player.photo}
							alt={playerData.player.name}
							className="w-14 h-14 rounded-full object-cover flex-shrink-0"
						/>
						<div className="flex-1 min-w-0">
							<h4 className="font-bold text-gray-900 truncate">
								{playerData.player.name}
							</h4>
							<p className="text-xs text-gray-600">
								{stats.games.minutes ?? 0} minutes
							</p>
						</div>
						<div className="flex gap-1.5 items-center">
							{(stats.goals.total ?? 0) > 0 && (
								<span className="text-lg">⚽</span>
							)}
							{(stats.goals.assists ?? 0) > 0 && (
								<span className="text-lg">🅰️</span>
							)}
							{stats.cards.yellow > 0 && (
								<span className="text-lg">🟨</span>
							)}
							{stats.cards.red > 0 && (
								<span className="text-lg">🟥</span>
							)}
						</div>
					</div>
				</button>

				{isSelected && (
					<div className="card bg-gradient-to-br from-gray-50 to-white ml-4 animate-fade-in">
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
							<div className="space-y-1">
								<h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
									<span className="text-lg">⚽</span> Scoring
								</h4>
								<StatRow
									label="Goals"
									value={stats.goals.total}
								/>
								<StatRow
									label="Assists"
									value={stats.goals.assists}
								/>
								<StatRow
									label="Total Shots"
									value={stats.shots.total}
								/>
								<StatRow
									label="On Target"
									value={stats.shots.on}
								/>
							</div>

							<div className="space-y-1">
								<h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
									<span className="text-lg">⚡</span> Passing
								</h4>
								<StatRow
									label="Total"
									value={stats.passes.total}
								/>
								<StatRow
									label="Key Passes"
									value={stats.passes.key}
								/>
								<StatRow
									label="Accuracy"
									value={
										stats.passes.accuracy
											? `${stats.passes.accuracy}%`
											: "0%"
									}
								/>
							</div>

							<div className="space-y-1">
								<h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
									<span className="text-lg">🛡️</span>{" "}
									Defending
								</h4>
								<StatRow
									label="Tackles"
									value={stats.tackles.total}
								/>
								<StatRow
									label="Blocks"
									value={stats.tackles.blocks}
								/>
								<StatRow
									label="Interceptions"
									value={stats.tackles.interceptions}
								/>
								<StatRow
									label="Duels Won"
									value={`${stats.duels.won ?? 0}/${stats.duels.total ?? 0}`}
								/>
							</div>

							<div className="space-y-1">
								<h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
									<span className="text-lg">🎯</span> Other
								</h4>
								<StatRow
									label="Dribbles"
									value={`${stats.dribbles.success ?? 0}/${stats.dribbles.attempts ?? 0}`}
								/>
								<StatRow
									label="Fouls Drawn"
									value={stats.fouls.drawn}
								/>
								<StatRow
									label="Fouls Committed"
									value={stats.fouls.committed}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="space-y-6">
			<div className="card bg-gradient-to-br from-primary-50 via-white to-primary-50">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<img
							src={homeTeam.team.logo}
							alt={homeTeam.team.name}
							className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
						/>
						<div>
							<h3 className="text-lg sm:text-xl font-bold text-gray-900">
								{homeTeam.team.name}
							</h3>
							<span className="text-sm text-blue-600 font-semibold">
								Home
							</span>
						</div>
					</div>
					<span className="text-2xl text-gray-400">VS</span>
					<div className="flex items-center gap-3 flex-row-reverse">
						<img
							src={awayTeam.team.logo}
							alt={awayTeam.team.name}
							className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
						/>
						<div className="text-right">
							<h3 className="text-lg sm:text-xl font-bold text-gray-900">
								{awayTeam.team.name}
							</h3>
							<span className="text-sm text-green-600 font-semibold">
								Away
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="grid lg:grid-cols-2 gap-6">
				<div className="card">
					<h3 className="text-lg font-display font-bold text-blue-600 mb-4 pb-3 border-b border-blue-200 flex items-center gap-2">
						<span className="text-2xl">👥</span>
						{homeTeam.team.name} Squad
					</h3>
					<div className="space-y-3">
						{homeTeam.players.map((playerData) =>
							renderPlayerCard(playerData, "blue"),
						)}
					</div>
				</div>

				<div className="card">
					<h3 className="text-lg font-display font-bold text-green-600 mb-4 pb-3 border-b border-green-200 flex items-center gap-2">
						<span className="text-2xl">👥</span>
						{awayTeam.team.name} Squad
					</h3>
					<div className="space-y-3">
						{awayTeam.players.map((playerData) =>
							renderPlayerCard(playerData, "green"),
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
