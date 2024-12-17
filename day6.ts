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

console.log(parsedInput)

const directions = ["^", ">", "v", "<"]

const relativePositions = {
  ">": [0, 1],
  "v": [1, 0],
  "<": [0, -1],
  "^": [-1, 0],
}

const turn = {
  ">": "v",
  "v": "<",
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
  const [dx, dy] = relativePositions[direction as keyof typeof relativePositions]
  const newPosition = [x + dx, y + dy]
  const [newX, newY] = newPosition
  if (input[newX][newY] === "#") {
    return position
  }
  return newPosition
}

const markPath = (input: string[][], position: number[]) => {
  const [x, y] = position
  input[x][y] = "X"
  return input
}

const startingPosition = getPosition(parsedInput, directions)

console.log(startingPosition)

