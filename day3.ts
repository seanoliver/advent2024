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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sampleConditionalInput =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

const filterConditionalPairs = (input: string): string => {
  const matchesWithConditionals = input.match(
    /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g,
  )
  let conditionActive = true

  let conditionalPairs: string = ""
  matchesWithConditionals?.map((match) => {
    if (match === "do()") {
      conditionActive = true
    } else if (match === "don't()") {
      conditionActive = false
    }

    if (conditionActive) conditionalPairs += match
  })
  return conditionalPairs
}

const conditionalPairs = filterConditionalPairs(input)
const conditionalTotal = sumProductofPairs(getPairs(conditionalPairs))

console.log("Unconditional Total: ", result)
console.log("Conditional Total: ", conditionalTotal)
