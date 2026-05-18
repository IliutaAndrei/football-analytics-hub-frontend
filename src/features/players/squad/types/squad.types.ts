export interface SquadResponse {
	team: SquadTeam;
	players: SquadPlayer[];
}
export interface SquadTeam {
	id: number;
	name: string;
	logo: string;
}

export interface SquadPlayer {
	id: number;
	name: string;
	position: string;
	photo: string;
}
