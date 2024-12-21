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

const parsedInput = input
  .trim()
  .split("\n")
  .map((line) => line.split(""))

const dimensions = {
  x: parsedInput[0].length,
  y: parsedInput.length,
}
console.log("dimensions", dimensions)

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

const main = ({ input }: { input: string[][] }) => {
  const currentPosition = getPosition(input, directions)
  if (!currentPosition) return

  const currentDirection = input[currentPosition[0]][currentPosition[1]]
  const newPosition = move(input, currentDirection, currentPosition)
  if (
    newPosition[0] >= input.length ||
    newPosition[1] >= input[0].length ||
    newPosition[0] < 0 ||
    newPosition[1] < 0
  ) {
    input[currentPosition[0]][currentPosition[1]] = "X"
    return input
  } else {
    const newPositionValue = input[newPosition[0]][newPosition[1]]
    if (!newPositionValue) return

    if (newPositionValue === "." || newPositionValue === "X") {
      markPath(input, newPosition)
      input[currentPosition[0]][currentPosition[1]] = "X"
      input[newPosition[0]][newPosition[1]] = currentDirection
      return main({ input })
    } else if (newPositionValue === "#") {
      const newDirection = turnRight[currentDirection as keyof typeof turnRight]
      input[currentPosition[0]][currentPosition[1]] = newDirection
      return main({ input })
    } else if (!newPositionValue) {
      return input
    }
  }
}

const result = main({ input: parsedInput })
const countX = result?.flat().filter((cell) => cell === "X").length
console.log("countX", countX)
