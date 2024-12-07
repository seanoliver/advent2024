const keyword = ["X", "M", "A", "S"]

const sampleInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`

const matrix = sampleInput
  .split("\n")
  .map((line) => line.split(""))
  .filter((line) => line.length > 0)

const findMatch = (
  char: string,
  keywordIndex: number,
  matches: number,
): { keywordIndex: number; matches: number } => {
  if (char === keyword[keywordIndex]) {
    if (keywordIndex === keyword.length - 1) {
      keywordIndex = 0
      matches++
    }
  } else {
    keywordIndex = 0
  }
  return { keywordIndex, matches }
}

const searchRow = (row: string[]) => {
  let keywordIndex = 0
  let matches = 0

  for (let i = 0; i < row.length; i++) {
    const { keywordIndex: newKeywordIndex, matches: newMatches } = findMatch(
      row[i],
      keywordIndex,
      matches,
    )
    keywordIndex = newKeywordIndex
    matches += newMatches
  }
  return matches
}

console.log(matrix.map(searchRow))
