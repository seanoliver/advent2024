// Sample Data

const list1 = [3, 4, 2, 1, 3, 3];
const list2 = [4, 3, 5, 3, 9, 3];

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

console.log(totalDistance);
