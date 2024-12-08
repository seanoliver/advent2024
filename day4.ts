import fs from "fs"

const input = fs.readFileSync("day4data.txt", "utf8")

type Direction = "right" | "left"
type Matrix = string[][]
type Sequence = string[]

const parseMatrix = (input: string): Matrix => 
  input
    .split("\n")
    .map(line => line.split(""))
    .filter(line => line.length > 0)

const matrix = parseMatrix(input)

// Core operations on sequences
const countXmas = (sequence: Sequence): number => 
  (sequence.join("").match(/XMAS/g) || []).length

const reverseSequence = (sequence: Sequence): Sequence => 
  [...sequence].reverse()

const countBothDirections = (sequence: Sequence): number => 
  countXmas(sequence) + countXmas(reverseSequence(sequence))

// Matrix operations
const getColumn = (matrix: Matrix, col: number): Sequence => 
  matrix.map(row => row[col])

const getDiagonal = (matrix: Matrix, startRow: number, startCol: number, direction: Direction): Sequence => {
  const result = []
  for (let i = 0; i < matrix.length; i++) {
    const row = startRow + i
    const col = direction === "right" ? startCol + i : startCol - i
    
    if (row >= matrix.length || col >= matrix[0].length || col < 0) break
    result.push(matrix[row][col])
  }
  return result
}

// Pattern search functions
const searchPattern = (sequences: Sequence[]): number =>
  sequences.reduce((sum, seq) => sum + countBothDirections(seq), 0)

const getRowSequences = (matrix: Matrix): Sequence[] => 
  matrix

const getColumnSequences = (matrix: Matrix): Sequence[] => 
  Array.from({ length: matrix[0].length }, (_, i) => getColumn(matrix, i))

const getDiagonalSequences = (matrix: Matrix, direction: Direction): Sequence[] => {
  const startCol = direction === "right" ? 0 : matrix[0].length - 1
  const topRow = Array.from({ length: matrix[0].length }, 
    (_, col) => getDiagonal(matrix, 0, col, direction))
  const sideCol = Array.from({ length: matrix.length - 1 }, 
    (_, row) => getDiagonal(matrix, row + 1, startCol, direction))
  return [...topRow, ...sideCol]
}

// Main search function
const search = (matrix: Matrix): number =>
  searchPattern(getRowSequences(matrix)) +
  searchPattern(getColumnSequences(matrix)) +
  searchPattern(getDiagonalSequences(matrix, "right")) +
  searchPattern(getDiagonalSequences(matrix, "left"))

console.log("XMAS Count:", search(matrix))
