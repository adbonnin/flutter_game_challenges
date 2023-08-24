import {Game} from "./Game";

export interface Challenge {
  title: string
  game: Game
  creator: string
  description: string
}