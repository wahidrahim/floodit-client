export interface IRootState {
  version: string
}

export interface IFlooditGameState {
  themeColors: string[]
  boardSize: number
  initialBoard: number[]
  currentBoard: number[]
  moves: number
}
