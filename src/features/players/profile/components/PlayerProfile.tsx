import { Link } from "react-router-dom";
import { usePlayerProfile } from "../hooks/usePlayerProfile";

interface PlayerProfileProps {
	playerId: number;
}

export const PlayerProfile = ({ playerId }: PlayerProfileProps) => {
	const { data, isError, error, isLoading } = usePlayerProfile(playerId);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
					<p className="text-gray-600">Loading player profile...</p>
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
				<p className="text-gray-600 text-lg">
					No player data available
				</p>
			</div>
		);
	}

	const calculateAge = (birthDate: string) => {
		if (!birthDate) return "Not available";
		const birth = new Date(birthDate);
		if (isNaN(birth.getTime())) return "Not available";
		const today = new Date();
		let age = today.getFullYear() - birth.getFullYear();
		const monthDiff = today.getMonth() - birth.getMonth();
		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birth.getDate())
		) {
			age--;
		}
		return age;
	};

	const formatDate = (dateString: string) => {
		if (!dateString) return "Not available";
		const date = new Date(dateString);
		if (isNaN(date.getTime())) return "Not available";
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		});
	};

	return (
		<div className="space-y-6">
			<div className="card bg-gradient-to-br from-gray-50 to-white">
				<div className="flex flex-col md:flex-row items-center md:items-start gap-8">
					<img
						src={data.photo}
						alt={data.name}
						className="w-40 h-40 rounded-xl object-cover shadow-xl"
					/>
					<div className="flex-1 text-center md:text-left space-y-4">
						<div>
							<h2 className="text-4xl font-display font-bold text-gray-900">
								{data.name}
							</h2>
							<p className="text-lg text-gray-600 mt-2">
								{data.firstName} {data.lastName}
							</p>
						</div>
						<div className="flex flex-wrap gap-4 justify-center md:justify-start items-center pt-2">
							<div className="flex items-center gap-2 text-gray-700">
								<svg
									className="w-5 h-5 text-primary-600"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
								</svg>
								<span className="font-semibold">
									{data.position}
								</span>
							</div>
							<div className="w-px h-6 bg-gray-300"></div>
							<div className="flex items-center gap-2 text-gray-700">
								<svg
									className="w-5 h-5 text-primary-600"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
										clipRule="evenodd"
									/>
								</svg>
								<span className="font-semibold">
									{data.nationality}
								</span>
							</div>
						</div>
						<Link
							to={`/players/${playerId}/statistics`}
							className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg"
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
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								/>
							</svg>
							View Season Statistics
						</Link>
					</div>
				</div>
			</div>

			<div className="card hover:shadow-xl transition-shadow duration-300">
				<div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
					<div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
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
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-display font-bold text-gray-900">
						Physical Information
					</h3>
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
						<div className="flex items-center gap-2 mb-2">
							<svg
								className="w-5 h-5 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							<p className="text-sm font-semibold text-gray-600">
								Date of Birth
							</p>
						</div>
						<p className="text-lg font-bold text-gray-900">
							{data.birthDate
								? formatDate(data.birthDate)
								: "Not available"}
						</p>
					</div>
					<div className="p-4 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-100">
						<div className="flex items-center gap-2 mb-2">
							<svg
								className="w-5 h-5 text-green-600"
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
							<p className="text-sm font-semibold text-gray-600">
								Age
							</p>
						</div>
						<p className="text-lg font-bold text-gray-900">
							{data.birthDate
								? `${calculateAge(data.birthDate)} years`
								: "Not available"}
						</p>
					</div>
					<div className="p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100">
						<div className="flex items-center gap-2 mb-2">
							<svg
								className="w-5 h-5 text-purple-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
								/>
							</svg>
							<p className="text-sm font-semibold text-gray-600">
								Height
							</p>
						</div>
						<p className="text-lg font-bold text-gray-900">
							{data.height
								? data.height.includes("cm")
									? data.height
									: `${data.height} cm`
								: "Not available"}
						</p>
					</div>
					<div className="p-4 bg-gradient-to-br from-orange-50 to-white rounded-lg border border-orange-100">
						<div className="flex items-center gap-2 mb-2">
							<svg
								className="w-5 h-5 text-orange-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
								/>
							</svg>
							<p className="text-sm font-semibold text-gray-600">
								Weight
							</p>
						</div>
						<p className="text-lg font-bold text-gray-900">
							{data.weight
								? data.weight.includes("kg")
									? data.weight
									: `${data.weight} kg`
								: "Not available"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
