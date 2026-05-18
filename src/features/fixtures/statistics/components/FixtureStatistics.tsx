import type { JSX } from "react";
import { useFixtureStatistics } from "../hooks/useFixtureStatistics";
import type { StatisticItem } from "../types/fixture.statistics.types";

interface FixtureStatisticsProps {
	fixtureId: number;
	homeGoals: number;
	awayGoals: number;
}

const StatComparison = ({
	label,
	homeValue,
	awayValue,
}: {
	label: string;
	homeValue: number | string | null;
	awayValue: number | string | null;
}): JSX.Element => {
	const isPercentage =
		typeof homeValue === "string" && homeValue?.includes("%");
	const homeNum = isPercentage
		? parseInt(String(homeValue))
		: Number(homeValue) || 0;
	const awayNum = isPercentage
		? parseInt(String(awayValue))
		: Number(awayValue) || 0;
	const total = homeNum + awayNum || 1;
	const homePercent = (homeNum / total) * 100;
	const awayPercent = (awayNum / total) * 100;

	return (
		<div className="space-y-2">
			<div className="flex justify-between items-center text-sm">
				<span className="font-semibold text-blue-600">
					{homeValue || 0}
				</span>
				<span className="text-gray-700 font-medium">{label}</span>
				<span className="font-semibold text-green-600">
					{awayValue || 0}
				</span>
			</div>
			<div className="flex h-3 rounded-full overflow-hidden bg-gray-200">
				<div
					className="bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
					style={{ width: `${homePercent}%` }}
				/>
				<div
					className="bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
					style={{ width: `${awayPercent}%` }}
				/>
			</div>
		</div>
	);
};

export const FixtureStatistics = ({
	fixtureId,
	homeGoals,
	awayGoals,
}: FixtureStatisticsProps) => {
	const { data, isLoading, error, isError } = useFixtureStatistics(fixtureId);

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
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
				<p className="text-gray-700 text-lg font-semibold mb-2">
					No statistics available
				</p>
				<p className="text-gray-600 text-sm">
					Statistics are only available for completed matches
				</p>
			</div>
		);
	}

	const homeTeam = data.response[0];
	const awayTeam = data.response[1];

	const getStatValue = (
		stats: StatisticItem[],
		type: string,
	): string | number | null => {
		const stat = stats.find((s) => s.type === type);
		return stat?.value ?? null;
	};

	return (
		<div className="space-y-6">
			<div className="card bg-gradient-to-br from-primary-50 via-white to-primary-50">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
					<div className="flex flex-col items-center gap-3 flex-1">
						<img
							src={homeTeam.team.logo}
							alt={homeTeam.team.name}
							className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
						/>
						<div className="text-center">
							<h3 className="text-lg sm:text-xl font-bold text-gray-900">
								{homeTeam.team.name}
							</h3>
							<span className="text-sm text-blue-600 font-semibold">
								Home
							</span>
						</div>
					</div>

					<div className="text-center px-4">
						<p className="text-xs text-gray-500 mb-2">
							Final Score
						</p>
						<div className="flex items-center gap-4">
							<span className="text-4xl sm:text-5xl font-bold text-blue-600">
								{homeGoals}
							</span>
							<span className="text-2xl text-gray-400">-</span>
							<span className="text-4xl sm:text-5xl font-bold text-green-600">
								{awayGoals}
							</span>
						</div>
					</div>

					<div className="flex flex-col items-center gap-3 flex-1">
						<img
							src={awayTeam.team.logo}
							alt={awayTeam.team.name}
							className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
						/>
						<div className="text-center">
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

			<div className="card">
				<h3 className="text-lg font-display font-bold text-gray-900 mb-6 flex items-center gap-2">
					<span className="text-2xl">📊</span>
					Match Statistics Comparison
				</h3>
				<div className="space-y-6">
					<StatComparison
						label="Shots on Goal"
						homeValue={getStatValue(
							homeTeam.statistics,
							"Shots on Goal",
						)}
						awayValue={getStatValue(
							awayTeam.statistics,
							"Shots on Goal",
						)}
					/>
					<StatComparison
						label="Total Shots"
						homeValue={getStatValue(
							homeTeam.statistics,
							"Total Shots",
						)}
						awayValue={getStatValue(
							awayTeam.statistics,
							"Total Shots",
						)}
					/>
					<StatComparison
						label="Ball Possession"
						homeValue={getStatValue(
							homeTeam.statistics,
							"Ball Possession",
						)}
						awayValue={getStatValue(
							awayTeam.statistics,
							"Ball Possession",
						)}
					/>
					<StatComparison
						label="Total Passes"
						homeValue={getStatValue(
							homeTeam.statistics,
							"Total passes",
						)}
						awayValue={getStatValue(
							awayTeam.statistics,
							"Total passes",
						)}
					/>
					<StatComparison
						label="Passes Accurate"
						homeValue={getStatValue(
							homeTeam.statistics,
							"Passes accurate",
						)}
						awayValue={getStatValue(
							awayTeam.statistics,
							"Passes accurate",
						)}
					/>
					<StatComparison
						label="Fouls"
						homeValue={getStatValue(homeTeam.statistics, "Fouls")}
						awayValue={getStatValue(awayTeam.statistics, "Fouls")}
					/>
					<StatComparison
						label="Corner Kicks"
						homeValue={getStatValue(
							homeTeam.statistics,
							"Corner Kicks",
						)}
						awayValue={getStatValue(
							awayTeam.statistics,
							"Corner Kicks",
						)}
					/>
					<StatComparison
						label="Offsides"
						homeValue={getStatValue(
							homeTeam.statistics,
							"Offsides",
						)}
						awayValue={getStatValue(
							awayTeam.statistics,
							"Offsides",
						)}
					/>
					<StatComparison
						label="Yellow Cards"
						homeValue={getStatValue(
							homeTeam.statistics,
							"Yellow Cards",
						)}
						awayValue={getStatValue(
							awayTeam.statistics,
							"Yellow Cards",
						)}
					/>
					<StatComparison
						label="Red Cards"
						homeValue={getStatValue(
							homeTeam.statistics,
							"Red Cards",
						)}
						awayValue={getStatValue(
							awayTeam.statistics,
							"Red Cards",
						)}
					/>
					<StatComparison
						label="Goalkeeper Saves"
						homeValue={getStatValue(
							homeTeam.statistics,
							"Goalkeeper Saves",
						)}
						awayValue={getStatValue(
							awayTeam.statistics,
							"Goalkeeper Saves",
						)}
					/>
				</div>
			</div>
		</div>
	);
};
