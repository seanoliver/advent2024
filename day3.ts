import fs from "fs"

const input = fs.readFileSync("day3data.txt", "utf8")

const getPairs = (input: string) => {
  const matches = input.match(/(mul\(\d+,\d+\))/g)

  const pairs = matches?.map((match) => {
    const pair = match.replace("mul(", "").replace(")", "").split(",")
    return pair.map(Number)
  })

  return pairs
}

const sumProductofPairs = (pairs: number[][] | undefined) => {
  if (!pairs) return 0
  return pairs.reduce((acc, curr) => acc + curr[0] * curr[1], 0)
}

const pairs = getPairs(input)
const result = sumProductofPairs(pairs)

console.log("Valid Pairs: ", pairs)
console.log("Total: ", result + 1)
