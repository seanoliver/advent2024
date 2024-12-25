import { readFileSync } from "fs"

const input = readFileSync("day6data.txt", "utf-8")

const sampleInput = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`

const parsedInput = sampleInput
  .trim()
  .split("\n")
  .map((line) => line.split(""))

const parsedInputRows = parsedInput.map((row) => row.join(""))

const directions = ["^", ">", "v", "<"]

const relativePositions = {
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
  "^": [-1, 0],
}

const turnRight = {
  ">": "v",
  v: "<",
  "<": "^",
  "^": ">",
}

const getPosition = (input: string[][], directions: string[]) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (directions.includes(input[i][j])) {
        return [i, j]
      }
    }
  }
}

const move = (input: string[][], direction: string, position: number[]) => {
  const [x, y] = position
  const [dx, dy] =
    relativePositions[direction as keyof typeof relativePositions]
  const newPosition = [x + dx, y + dy]
  return newPosition
}

const markPath = (input: string[][], position: number[]) => {
  const [x, y] = position
  input[x][y] = "X"
  return input
}

const main = ({
  input,
  steps = 0,
}: {
  input: string[][]
  steps: number
}): { input: string[][]; steps: number } => {
  const processStep = ({
    input,
    steps,
  }: {
    input: string[][]
    steps: number
  }): { input: string[][]; steps: number } => {
    steps++

    if (steps > 1000) {
      return { input, steps }
    } else {
      return main({ input, steps })
    }
  }

  const currentPosition = getPosition(input, directions)
  if (!currentPosition) return { input, steps }

  const currentDirection = input[currentPosition[0]][currentPosition[1]]
  const newPosition = move(input, currentDirection, currentPosition)
  if (
    newPosition[0] >= input.length ||
    newPosition[1] >= input[0].length ||
    newPosition[0] < 0 ||
    newPosition[1] < 0
  ) {
    input[currentPosition[0]][currentPosition[1]] = "X"
    return { input, steps }
  } else {
    const newPositionValue = input[newPosition[0]][newPosition[1]]
    if (!newPositionValue) return processStep({ input, steps })

    if (newPositionValue === "." || newPositionValue === "X") {
      markPath(input, newPosition)
      input[currentPosition[0]][currentPosition[1]] = "X"
      input[newPosition[0]][newPosition[1]] = currentDirection
      return processStep({ input, steps })
    } else if (newPositionValue === "#" || newPositionValue === "O") {
      const newDirection = turnRight[currentDirection as keyof typeof turnRight]
      input[currentPosition[0]][currentPosition[1]] = newDirection
      return processStep({ input, steps })
    } else if (!newPositionValue) {
      return { input, steps }
    }
  }
  return { input, steps }
}

const result = main({ input: parsedInput, steps: 0 })
const countX = result.input?.flat().filter((cell) => cell === "X").length
console.log("Count of X:", countX)

type Direction = 'U' | 'R' | 'D' | 'L'

interface State {
  row: number
  col: number
  dir: Direction
}

export function solvePartTwo(grid: string[]): number {
  // Parse the grid to locate guard start and direction
  const numRows = grid.length
  const numCols = grid[0].length

  let guardStartRow = 0
  let guardStartCol = 0
  let guardStartDir: Direction = 'U'

  // Convert grid into mutable structure, e.g. an array of arrays
  const cells = grid.map(row => row.split(''))

  // Identify guard's initial position/direction
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      const ch = cells[r][c]
      if (ch === '^' || ch === '>' || ch === 'v' || ch === '<') {
        guardStartRow = r
        guardStartCol = c
        if (ch === '^') guardStartDir = 'U'
        if (ch === '>') guardStartDir = 'R'
        if (ch === 'v') guardStartDir = 'D'
        if (ch === '<') guardStartDir = 'L'
        // Replace guard symbol with '.' so we treat it as empty
        cells[r][c] = '.'
        break
      }
    }
  }

  // Helper to check if a cell is blocked
  function isBlocked(r: number, c: number, gridArr: string[][]): boolean {
    if (r < 0 || c < 0 || r >= numRows || c >= numCols) {
      // Outside the grid is effectively "not blocked" for turning logic,
      // but stepping there means the guard leaves the grid
      return false
    }
    return gridArr[r][c] === '#'
  }

  // Move forward one step in the current direction
  function step(r: number, c: number, dir: Direction): { row: number; col: number } {
    if (dir === 'U') return { row: r - 1, col: c }
    if (dir === 'R') return { row: r, col: c + 1 }
    if (dir === 'D') return { row: r + 1, col: c }
    // dir === 'L'
    return { row: r, col: c - 1 }
  }

  // Turn right
  function turnRight(dir: Direction): Direction {
    if (dir === 'U') return 'R'
    if (dir === 'R') return 'D'
    if (dir === 'D') return 'L'
    return 'U'
  }

  // Simulate guard movement with one optional new obstruction
  function causesLoop(blockRow: number, blockCol: number): boolean {
    // Copy the grid so we can place an obstruction
    const gridCopy = cells.map(row => [...row])
    gridCopy[blockRow][blockCol] = '#'

    const visited = new Set<string>()

    let r = guardStartRow
    let c = guardStartCol
    let d = guardStartDir

    // Track states until we exit or see repetition
    while (true) {
      const stateKey = `${r},${c},${d}`
      if (visited.has(stateKey)) {
        // We revisited the same position + direction -> loop
        return true
      }
      visited.add(stateKey)

      // Check if next step is out of bounds
      const { row: nr, col: nc } = step(r, c, d)
      if (nr < 0 || nr >= numRows || nc < 0 || nc >= numCols) {
        // Guard leaves the grid
        return false
      }

      // If next cell is blocked, turn right
      if (isBlocked(nr, nc, gridCopy)) {
        d = turnRight(d)
        continue
      }

      // Otherwise, move forward
      r = nr
      c = nc
    }
  }

  let count = 0

  // Try placing a new obstruction on every free cell ('.') except the guard’s start
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (r === guardStartRow && c === guardStartCol) {
        // Cannot place an obstacle at guard's start
        continue
      }
      if (cells[r][c] === '.') {
        if (causesLoop(r, c)) {
          count++
        }
      }
    }
  }

  return count
}

console.log("Valid obstacles: ", solvePartTwo(parsedInputRows))
