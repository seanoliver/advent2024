import fs from "fs"

const data = fs.readFileSync("day2data.txt", "utf8")
const lines = data.split("\n")
const reports = lines.map((line) => line.split(" ").map(Number))

// Sample Data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sampleReports = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9],
]

let safeReports = 0
let safeWithDampner = 0

const isIncreasing = (report: number[]) => {
  return report.every((num, index) => {
    if (index === 0) return true
    return (
      num > report[index - 1] &&
      num - report[index - 1] >= 1 &&
      num - report[index - 1] <= 3
    )
  })
}

const isDecreasing = (report: number[]) => {
  return report.every((num, index) => {
    if (index === 0) return true
    return (
      num < report[index - 1] &&
      report[index - 1] - num >= 1 &&
      report[index - 1] - num <= 3
    )
  })
}

const withProblemDampner = (report: number[]) => {
  for (let i = 0; i < report.length; i++) {
    const reducedReport = report.filter((_, index) => index !== i)

    if (isIncreasing(reducedReport) || isDecreasing(reducedReport)) {
      return true
    }
  }
  return false
}

reports.map((report) => {
  if (isIncreasing(report) || isDecreasing(report)) {
    safeReports++
  } else if (withProblemDampner(report)) {
    safeWithDampner++
  }

  return safeReports
})

console.log("Safe Reports:", safeReports)
console.log("Safe Reports with Dampner:", safeWithDampner)
console.log("Total Safe Reports:", safeReports + safeWithDampner)
