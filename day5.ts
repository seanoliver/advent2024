import fs from "fs"

const sampleRules = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13
`
const sampleUpdates = `
75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`

const input = fs.readFileSync("day5data.txt", "utf8")

const [inputRules, inputUpdates] = input.split('\n\n')

const splitRules = (rules: string) => {
  return rules
    .trim()
    .split("\n")
    .map((rule) => rule.split("|").map(Number))
}

const splitUpdates = (updates: string) => {
  return updates
    .trim()
    .split("\n")
    .map((update) => update.split(",").map(Number))
}

const rules = splitRules(inputRules)
const updates = splitUpdates(inputUpdates)

// const mapUpdates = (update: number[]) => {
//   return update.map((num, pos) => {
//     return [num, pos]
//   })
// }

// Return only the rules where both of its numbers are included in the update
const getRelevantRules = (rules: number[][], update: number[]) => {
  return rules.filter((rule) => {
    return rule.every((num) => update.includes(num))
  })
}

// Create a tuple of indexes for the two vals in the rule
const checkPassRule = (update: number[], rule: number[]) => {
  const firstNumIndex = update.indexOf(rule[0])
  const secondNumIndex = update.indexOf(rule[1])
  
  return (secondNumIndex - firstNumIndex) > 0
}

// Check a single update
const checkRelevantRules = (rules: number[][], update: number[]) => {
  return rules.every((rule) => {
    return checkPassRule(update, rule)
  })
}

const findPassingUpdates = (updates: number[][], rules: number[][]) => {
  const passingIndices: number[] = []
  updates.map((update, index) => {
    const relevantRules = getRelevantRules(rules, update)
    const isValidUpdate = checkRelevantRules(relevantRules, update)
    if (isValidUpdate) passingIndices.push(index)
    console.log(`Update #${index}: ${isValidUpdate}`)
  })
  return passingIndices
}

const passingIndices = findPassingUpdates(updates, rules)

const findMiddleNumber = (update: number[]) => {
  const updateLength = update.length - 1
  const midpoint = Math.round(updateLength / 2)

  return update[midpoint]
}

const addUpAllPassingMiddleNumbers = (passingIndices: number[], updates: number[][]) => {
  let sum: number = 0
  for (const index of passingIndices) {
    const middleNumber = findMiddleNumber(updates[index])
    sum = sum + middleNumber
  }
  return sum
}

console.log(`Sum of Passing Updates: ${addUpAllPassingMiddleNumbers(passingIndices, updates)}`)
