import { readFileSync } from "fs"

const input = readFileSync("day7data.txt", "utf-8")

const sampleInput = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`

type Operation = (a: number, b: number) => number
type Equation = {
  target: number
  numbers: number[]
}

const runPartOne = () => {
  // Hashmap of outputs to array of operands
  const inputMap: Equation[] = input
    .trim()
    .split("\n")
    .map((row) => {
      const splits = row.split(":")
      const key = Number(splits[0])
      const vals = splits[1].split(" ").map((num) => Number(num))
      return { target: key, numbers: vals }
    })

  // Operations helpers
  const add: Operation = (a: number, b: number) => a + b
  const multiply: Operation = (a: number, b: number) => a * b
  const concat: Operation = (a: number, b: number) => Number(`${a}${b}`)

  const operators = [add, multiply, concat]

  const canHitTarget = (
    numbers: number[],
    target: number,
    index = 1,
    current = numbers[0],
  ) => {
    if (index === numbers.length) {
      return current === target
    }

    for (const operation of operators) {
      if (
        canHitTarget(
          numbers,
          target,
          index + 1,
          operation(current, numbers[index]),
        )
      ) {
        return true
      }
    }
    return false
  }

  const sumValidEquations = (equations: Equation[]) => {
    return equations.reduce((acc, eq) => {
      if (canHitTarget(eq.numbers, eq.target)) {
        return acc + eq.target
      }
      return acc
    }, 0)
  }

  const result = sumValidEquations(inputMap)
  console.log("Valid Equations: ", result)
  return result
}

runPartOne()
