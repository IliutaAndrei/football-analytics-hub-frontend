import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Layout = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<main className="container-app py-8">
				<Outlet />
			</main>
			<footer className="bg-white border-t border-gray-200 mt-16">
				<div className="container-app py-6">
					<p className="text-center text-sm text-gray-500">
						© 2026 Football Analytics Hub. Data provided by
						API-Football.
					</p>
				</div>
			</footer>
		</div>
	);
};
