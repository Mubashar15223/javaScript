
const Students = [
      { name: "Alice", grade: 90 },
      { name: "Bob", grade: 80 },
      { name: "Charlie", grade: 95 },
      { name: "Dave", grade: 95 },
    ];
    const midStudent = [{ name: "Eve", grade: 88 }, { name: "Frank" }];

// problem 1 : Problem # 1: Use the "concat" method to combine the "students" array with an additional array of objects representing new students who joined the class mid-semester. The new students are:
function addindVal(arr1, arr2) {
  let allStudent = arr1;
  let newStudent = [];
  newStudent = allStudent.concat(arr2); 
  return newStudent;
}
 console.log ("Output of problem 1:",addindVal(Students,midStudent));

//Problem # 2: Use the "entries" method to create an iterator over the "students"
// array and log each index and value to the console.
function iterate(arr1) {
  let obj = arr1.entries();
  for (let [index, value] of obj) {
    console.log(`index: ${index} and value:  ${value}`);
  }
}
//   console.log(Students);
//   Problem # 3:
// Use the "every" method to check if all students have a passing grade (i.e. grade >= 70).
function returnPass(students) {
  const passed = students.every((obj) => obj.grade >= 80);
  return passed;
}
//     console.log(returnPass(Students));

//     Problem # 4:
// Use the "fill" method to replace all student grades with a grade of 100.

function replace(Students){
      const grades = Students.map(student => student.grade);
      grades.fill(100);
      Students.forEach((student, index) => student.grade = grades[index]);
      console.log(Students);
}
console.log(replace(Students));

// Problem # 5:
// Use the "filter" method to create a new array containing only the students who have a grade above 90.
function getGrade(stu) {
  const bestGrade = stu.filter((obj) => obj.grade > 90);
  return bestGrade;
}
// console.log(getGrade(Students));
// Problem # 6:
// Use the "find" method to find the first student with a name of "Charlie" and log their grade to the console.
function findGrade(stu) {
  const student = stu.find(({ name }) => name === "Charlie");
  if (student) {
    console.log(student.grade);
  } else {
    console.log("student grade not find");
  }
}
// findGrade(Students);
// Problem # 7:
// Use the "findIndex" method to find the index of the first student with a grade of 85.
function studentIndex(stu) {
  let grade = stu.findIndex(({ grade }) => grade === 85);
  return grade;
}
// console.log(studentIndex(Students));
// Problem # 8: Use the "flat" method to flatten an array of arrays.
//  The input array is: const nestedArray = [[1, 2], [3, 4, 5], [6]];
function flatten(nested) {
  let nestedArray = nested.flat();
  return nestedArray;
}
nestedArray = [[1, 2], [3, 4, 5], [6]];
//      console.log(flatten(nestedArray));
// Problem # 9: Use the "flatMap" method to map over the
// "students" array and create a new array of objects with a "passing"
// property that is true if the student has a grade >= 70 and false otherwise.

function passStudents(stu) {
  let passing = stu.flatMap(({ grade }) => grade >= 90);
  return passing;
}
// console.log(passStudents(Students));

// Problem # 10: Use the "forEach" method to log the name of each student to the console.
function studentName(stu) {
  let name = stu.forEach((obj) => console.log(obj.name));
  return name;
}
// studentName(Students);

// Problem # 11: Use the "from" method to create a new array from a string. The string is: const string = "hello world";
function strArr(str) {
  let strArr = Array.from(str);
  return strArr;
}
const string = "hello world";
// console.log(strArr(string));

// Problem # 12: Use the "includes" method to check if the "students"
// array includes a student with a name of "Eve".
function checkStudent(stu) {
  let mapping = stu.map((obj) => obj.name);
  let here = mapping.includes("c");
  return here;
}
// console.log(checkStudent(Students));
// Problem # 13: Use the "indexOf" method to find the index of the
//  first student with a name of "Bob".
function findIndex(stu) {
  let index = stu.indexOf("Bob");
  return index;
}
// console.log(findIndex(Students));
// Problem # 14: Use the "map" method to create a new array
//  containing only the grades of the students.
function newArray(stu) {
  const grades = stu.map((student) => student.grade);
  return grades;
}
console.log(newArray(Students));
// Problem # 15: Use the "push" method to add a new student to the end of the "students" array.
// The new student is: const newStudent = { name: "Grace", grade: 87 };
function merageObjectInArray(stu) {
  const newStudent = { name: "Grace", grade: 87 };
  stu.push(newStudent);
  return stu;
}
// console.log(merageObjectInArray(Students));
// Problem # 16: Use the "pop" method to remove the last student from the "students" array.
function removeItem(stu) {
  stu.pop();
  return stu;
}
// console.log(removeItem(Students));
// Problem # 17: Use the "reverse" method to reverse the order of the "students"
function reverseArray(stu) {
  stu.reverse();
  return stu;
}
// console.log(reverseArray(Students));
// Problem # 18: Use the "shift" method to remove the first student from the "students" array.
function removeStudent(stu) {
  stu.shift();
}
// console.log(removeStudent(Students));
// Problem # 19: Use the "reduce" method to calculate the average grade of all the students.
function average(stu) {
  let grade = stu.map((obj) => obj.grade);
  let total = grade.reduce((ac, ini) => ac + ini);
  let avg =  total/stu.length-1;
return avg;
}
// console.log(average(Students));
