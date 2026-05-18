import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import App from "./App";
import CountriesPage from "./pages/CountriesPage";
import LeaguesPage from "./pages/LeaguesPage";
import SeasonsPage from "./pages/SeasonsPage";
import StandingsPage from "./pages/StandingsPage";
import TeamsPage from "./pages/TeamsPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import StatisticsPage from "./pages/StatisticsPage";
import SeasonFixturesPage from "./pages/SeasonFixturesPage";
import TeamFixturesPage from "./pages/TeamFixturesPage";
import SquadPlayersListPage from "./pages/SquadPlayersList";
import PlayerProfilePage from "./pages/PlayerProfilePage";
import PlayerStatisticsSeasonPage from "./pages/PlayerStatisticsSeason";
import FixtureStatisticsPage from "./pages/FixtureStatisticsPage";
import FixturePlayersPage from "./pages/FixturePlayersPage";
import TeamDetailsByExternalIdPage from "./pages/TeamDetailsByExternalIdPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "countries",
				element: <CountriesPage />,
			},
			{
				path: "leagues/:countryCode",
				element: <LeaguesPage />,
			},
			{
				path: "leagues/:leagueId/seasons",
				element: <SeasonsPage />,
			},
			{
				path: "leagues/:leagueId/seasons/:seasonYear/standings",
				element: <StandingsPage />,
			},
			{
				path: "leagues/:leagueId/seasons/:seasonYear/teams",
				element: <TeamsPage />,
			},
			{
				path: "leagues/:leagueId/seasons/:seasonYear/teams/by-external-id/:externalTeamId",
				element: <TeamDetailsByExternalIdPage />,
			},
			{
				path: "leagues/:leagueId/seasons/:seasonYear/teams/:teamId",
				element: <TeamDetailsPage />,
			},
			{
				path: "leagues/:leagueId/seasons/:seasonYear/teams/:teamId",
				element: <TeamDetailsPage />,
			},
			{
				path: "leagues/:leagueId/seasons/:seasonYear/teams/:teamId/statistics",
				element: <StatisticsPage />,
			},
			{
				path: "leagues/:leagueId/seasons/:seasonYear/fixtures",
				element: <SeasonFixturesPage />,
			},
			{
				path: "leagues/:leagueId/seasons/:seasonYear/teams/:teamId/fixtures",
				element: <TeamFixturesPage />,
			},
			{
				path: "leagues/:leagueId/seasons/:seasonYear/teams/:teamId/squad",
				element: <SquadPlayersListPage />,
			},
			{
				path: "players/:playerId/profile",
				element: <PlayerProfilePage />,
			},
			{
				path: "players/:playerId/statistics",
				element: <PlayerStatisticsSeasonPage />,
			},
			{
				path: "fixtures/:fixtureId/statistics",
				element: <FixtureStatisticsPage />,
			},
			{
				path: "fixtures/:fixtureId/players",
				element: <FixturePlayersPage />,
			},
		],
	},
]);
