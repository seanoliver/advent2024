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

const [inputRules, inputUpdates] = input.split("\n\n")

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

  return secondNumIndex - firstNumIndex > 0
}

// Check a single update
const checkRelevantRules = (rules: number[][], update: number[]) => {
  return rules.every((rule) => {
    return checkPassRule(update, rule)
  })
}

const returnFailingRule = (rules: number[][], update: number[]) => {
  for (const rule of rules) {
    const result = checkPassRule(update, rule)
    if (result) continue
    if (!result) return rule
  }
}

const findPassingAndFailingUpdateIndices = (
  updates: number[][],
  rules: number[][],
) => {
  const passingIndices: number[] = []
  const failingIndices: number[] = []
  updates.map((update, index) => {
    const relevantRules = getRelevantRules(rules, update)
    const isValidUpdate = checkRelevantRules(relevantRules, update)
    if (isValidUpdate) {
      passingIndices.push(index)
    } else {
      failingIndices.push(index)
    }
    console.log(`Update #${index}: ${isValidUpdate}`)
  })
  return [passingIndices, failingIndices]
}

const [passingIndices, failingIndices] = findPassingAndFailingUpdateIndices(
  updates,
  rules,
)

const findMiddleNumber = (update: number[]) => {
  const updateLength = update.length - 1
  const midpoint = Math.round(updateLength / 2)

  return update[midpoint]
}

const addUpAllPassingMiddleNumbers = (updates: number[][]) => {
  let sum: number = 0
  for (const update of updates) {
    const middleNumber = findMiddleNumber(update)
    sum = sum + middleNumber
  }
  return sum
}

const passingUpdates = updates.filter((_, index) => {
  return passingIndices.includes(index)
})

console.log(
  `Sum of Passing Updates: ${addUpAllPassingMiddleNumbers(passingUpdates)}`,
)

const swapNumberPositions = (update: number[], failingRule: number[]) => {
  const firstIndex = update.indexOf(failingRule[0])
  const secondIndex = update.indexOf(failingRule[1])

  const firstNum = update.slice(firstIndex, firstIndex + 1)
  const secondNum = update.slice(secondIndex, secondIndex + 1)

  update.splice(firstIndex, 1, secondNum[0])
  update.splice(secondIndex, 1, firstNum[0])
  return update
}

const fixFailingUpdate = (badUpdate: number[], rules: number[][]) => {
  const relevantRules = getRelevantRules(rules, badUpdate)
  let update = badUpdate

  while (!checkRelevantRules(relevantRules, update)) {
    const failingRule = returnFailingRule(relevantRules, update)
    if (!failingRule) continue
    update = swapNumberPositions(update, failingRule)
  }
  return update
}

const fixFailingUpdates = (failingIndices: number[], updates: number[][]) => {
  const fixedUpdates: number[][] = []
  for (const index of failingIndices) {
    const badUpdate = updates[index]
    const fixedUpdate = fixFailingUpdate(badUpdate, rules)
    fixedUpdates.push(fixedUpdate)
  }
  return fixedUpdates
}

const fixedUpdates = fixFailingUpdates(failingIndices, updates)

console.log(
  `Sum of Fixed Failing Updates: ${addUpAllPassingMiddleNumbers(fixedUpdates)}`,
)
