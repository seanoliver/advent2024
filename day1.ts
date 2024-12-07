import fs from "fs";

const data = fs.readFileSync("day1data.txt", "utf8");
const lines = data.split("\n");
const pairs = lines.map((line) => line.split("    "));
const tuples = pairs.map((pair) => pair[0].split("   ").map(Number));

// const list1 = [3, 4, 2, 1, 3, 3];
// const list2 = [4, 3, 5, 3, 9, 3];

// Sample Data
const list1 = tuples.map((tuple) => tuple[0]);
const list2 = tuples.map((tuple) => tuple[1]);


// Sort the lists smallest to largest
const sortedList1 = list1.sort((a, b) => a - b);
const sortedList2 = list2.sort((a, b) => a - b);

// Get the length of the lists
const length1 = sortedList1.length;
const length2 = sortedList2.length;

if (length1 !== length2) {
  console.log("Lists are not the same length");
}

const distances: number[] = [];

for (let i = 0; i < length1; i++) {
  const distance = Math.abs(sortedList1[i] - sortedList2[i]);
  distances.push(distance);
}

const totalDistance = distances.reduce((acc, curr) => acc + curr, 0);

console.log("Total Distance:", totalDistance);

const similarityScore = sortedList1.reduce((acc, curr) => {
  const instances = sortedList2.filter((num) => num === curr).length;
  const increase = curr * instances;
  return acc + increase;
}, 0);

console.log("Similarity Score:", similarityScore);
