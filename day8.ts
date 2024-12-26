const sampleInput = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`

// Iterate through every combination of each one and calculate antinode locations
// Cut out any antinode locations that aren't within bounds
// Total up the total number of remaining antinodes (ignoring any antinodes that share a location with a node)

const runPartOne = () => {
  const inputMatrix = sampleInput.trim().split('\n').map(row => row.split(''))

  // Collect coordinates of each of the instances of an antenna in a hashmap
  const coordinates: Record<string, number[][]> = {}
  for (let i = 0; i < inputMatrix.length; i++) {
    for (let j = 0; j < inputMatrix[0].length; j++) {
      if (inputMatrix[i][j] === '.') continue

      const val = inputMatrix[i][j]
      const coords = [i, j]
      coordinates[val] = coordinates[val] ? [...coordinates[val], coords] : [coords]
    }
  }
  console.log(coordinates)

  for (const val in coordinates) {
    console.log(`${val}: ${coordinates[val].length}`)
  }
}

runPartOne()