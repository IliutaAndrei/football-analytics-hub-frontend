import { Link } from "react-router-dom";
import { useSquad } from "../hooks/useSquad";
import { useState, useMemo } from "react";

interface SquadPlayersListProps {
	teamId: number;
}

export const SquadPlayersList = ({ teamId }: SquadPlayersListProps) => {
	const { data, error, isError, isLoading } = useSquad(teamId);
	const [searchTerm, setSearchTerm] = useState("");

	const groupedPlayers = useMemo(() => {
		if (!data?.players) return {};

		const filtered = data.players.filter((player) => {
			const searchLower = searchTerm.toLowerCase();
			return (
				player.name.toLowerCase().includes(searchLower) ||
				(player.position &&
					player.position.toLowerCase().includes(searchLower))
			);
		});

		return filtered.reduce(
			(acc, player) => {
				const position = player.position || "Unknown";
				if (!acc[position]) {
					acc[position] = [];
				}
				acc[position].push(player);
				return acc;
			},
			{} as Record<string, typeof filtered>,
		);
	}, [data, searchTerm]);

	const positionOrder = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];
	const sortedPositions = Object.keys(groupedPlayers).sort((a, b) => {
		const indexA = positionOrder.indexOf(a);
		const indexB = positionOrder.indexOf(b);
		if (indexA === -1 && indexB === -1) return a.localeCompare(b);
		if (indexA === -1) return 1;
		if (indexB === -1) return -1;
		return indexA - indexB;
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
					<p className="text-gray-600">Loading squad players...</p>
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
				<p className="text-gray-600 text-lg mb-2">No data available</p>
			</div>
		);
	}

	if (!data.players || data.players.length === 0) {
		return (
			<div>
				<div className="card mb-6">
					<div className="flex items-center gap-4">
						<img
							src={data.team.logo}
							alt={data.team.name}
							className="w-16 h-16 object-contain"
						/>
						<div>
							<h2 className="text-2xl font-display font-bold text-gray-900">
								{data.team.name}
							</h2>
						</div>
					</div>
				</div>
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
						No players available for this team
					</p>
					<p className="text-gray-600 text-sm">
						Squad information may not be available for this season
						or team
					</p>
				</div>
			</div>
		);
	}

	const totalFiltered = Object.values(groupedPlayers).reduce(
		(sum, players) => sum + players.length,
		0,
	);

	return (
		<div className="space-y-6">
			<div className="card">
				<div className="flex items-center gap-4 mb-6">
					<img
						src={data.team.logo}
						alt={data.team.name}
						className="w-16 h-16 object-contain"
					/>
					<div>
						<h2 className="text-2xl font-display font-bold text-gray-900">
							{data.team.name}
						</h2>
						<p className="text-gray-600">
							{data.players.length} players in squad
						</p>
					</div>
				</div>

				<div className="pt-6 border-t border-gray-200">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg
								className="h-5 w-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
						<input
							type="text"
							placeholder="Search players by name or position..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 outline-none"
						/>
						{searchTerm && (
							<button
								onClick={() => setSearchTerm("")}
								className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
							>
								<svg
									className="h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						)}
					</div>

					{searchTerm && (
						<div className="mt-4 pt-4 border-t border-gray-200">
							<p className="text-sm text-gray-700 font-medium">
								Showing {totalFiltered} of {data.players.length}{" "}
								players
							</p>
						</div>
					)}
				</div>
			</div>

			{totalFiltered === 0 ? (
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
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p className="text-gray-800 text-lg font-semibold mb-2">
						No players found
					</p>
					<p className="text-gray-600 text-sm">
						Try adjusting your search criteria
					</p>
					<button
						onClick={() => setSearchTerm("")}
						className="mt-4 text-primary-600 hover:text-primary-700 font-semibold text-sm"
					>
						Clear search
					</button>
				</div>
			) : (
				<div className="space-y-6">
					{sortedPositions.map((position) => (
						<div key={position} className="card">
							<h3 className="text-xl font-display font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center gap-3">
								<div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
									<span className="text-xl">
										{position === "Goalkeeper" && "🧤"}
										{position === "Defender" && "🛡️"}
										{position === "Midfielder" && "⚡"}
										{position === "Attacker" && "⚽"}
										{![
											"Goalkeeper",
											"Defender",
											"Midfielder",
											"Attacker",
										].includes(position) && "👤"}
									</span>
								</div>
								<div className="flex-1">
									<span className="text-xl">{position}</span>
									<p className="text-sm font-normal text-gray-600">
										{groupedPlayers[position].length}{" "}
										{groupedPlayers[position].length === 1
											? "player"
											: "players"}
									</p>
								</div>
							</h3>
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
								{groupedPlayers[position].map((player) => (
									<Link
										key={player.id}
										to={`/players/${player.id}/profile`}
										className="card hover:shadow-xl transition-all duration-200 hover:scale-105 group p-4"
									>
										<div className="flex flex-col items-center text-center">
											<div className="w-20 h-20 mb-3 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shadow-md">
												{player.photo ? (
													<img
														src={player.photo}
														alt={player.name}
														className="w-full h-full object-cover"
													/>
												) : (
													<svg
														className="w-10 h-10 text-gray-400"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
														/>
													</svg>
												)}
											</div>
											<h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 text-sm line-clamp-2">
												{player.name}
											</h4>
										</div>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
