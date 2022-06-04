/*
    CIT 281 Lab 5
    Name: Qiqi Ma
*/

const students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  }
];
let last = students.pop();

console.log(last)
console.log(Object.keys(last))

const fastify = require("fastify")();
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

const generateNextId = () => {
  let nextId = null;
  let lastId = students.pop()
  return nextId;
};

function appendsToStudent(newStudent) {
  let nextId = generateNextId();
  let updatedStudentArray = students.push({id : nextId, last: "Last" + nextId,
  first: "First" + nextId});
  return updatedStudentArray;
};

function getStudentById(id) {
  let idInInteger = parseInt(id);
  let studentWithId;
  for (student of students) {
    console.log("id :" + idInInteger )
  }
  return studentWithId;
}

fastify.get("/cit/student", function (request, reply) {
  reply
    .code(200) 
    .header("Content-Type", "application/json; charset=utf-8") 
    .send(students); 
});

fastify.post("/cit/student", function (request, reply) {
  const newStudent = request.body; // {first: "", last: ""}
  const updatedStudentArray = appendsToStudent(newStudent);
  reply
    .code(200) 
    .header("Content-Type", "application/json; charset=utf-8") 
    .send(updatedStudentArray); // we need to send back the updated student arry
});

fastify.get("/cit/student/:id", function (request, reply) {
  const {} = request.params; // this line is incomplete. retrieve the id from the request.params
  let student = null;
  /* learn how getStudentById works. Or implement one of yours. 
  Use this function to update the variable student and send it back as a response
  */
  reply
    .code(200) // status code
    .header("Content-Type", "application/json; charset=utf-8") // mime type is text/html needs to change. google "mime types mozilla"
    .send(null); // this line needs to change
});

/**
 * route that handles invalid /cit requests. eg: "/cit/classes" or "cit/Unmatched"
 */
 fastify.get("/cit/*", (request, reply) => {
  reply
    .code(200) // update the status code accordingly
    .header("Content-Type", "text/text; charset=utf-8") // change this if it is required
    .send(null); // change this if it required
});
// 1 more for 404
// post route