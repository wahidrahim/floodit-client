declare interface IScore {
  id?: number
  size: number
  board: number[]
  moves: number
  player?: string
}

declare interface ICell {
  notified: boolean
  colorIndex: number
  colorString: string
  setNeighbors(neighbors: ICell[]): void
  changeColor(colorIndex: number): void
}
