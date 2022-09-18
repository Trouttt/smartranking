import { Player } from 'src/players/interface/players.interface';

export interface Challenger extends Document {
  dateHourChallenger: Date;
  status: ChallengerStatus;
  dateHourRequisition: Date;
  requester: Player;
  category: string;
  players: Array<Player>;
  match: Match;
}

export interface Match extends Document {
  category: string;
  players: Array<Player>;
  def: Player;
  result: Array<Result>;
}

export interface Result {
  set: string;
}
