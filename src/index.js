// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const port = 8080;

// // Parse JSON bodies (as sent by API clients)
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// //const {connection}  = require("mongoose");
// const { connection } = require("./connector");
// app.get("/findColleges", (req, res) => {
//   const { name, state, city, minPackage, maxFees, course, exams } = req.query;

//   if(minPackage<0||maxFees<0){
//     res.status(400).send({msg:"invalid request"});
//     return;
//   }

//   console.log(name, state, city, minPackage, maxFees, course, exams);
//   const match = {
//     name: name ? { $regex: name, $options: "i" } : { $regex: /.*/ },
//     state: state ? { $regex: state, $options: "i" } : { $regex: /.*/ },
//     city: city ? { $regex: city, $options: "i" } : { $regex: /.*/ },
//     minPackage: { $gte: Number(minPackage) },
//     maxFees: { $lte: Number(maxFees) },
//     course: course ? { $regex: course, $options: "i" } : { $regex: /.*/ },
//     exam: exams ? { $regex: exams, $options: "i" } : { $regex: /.*/ },
//   };
//   connection
//     .find(match)
//     .then((data) => res.send(data))
//     .catch((err) => res.status(400).send({ msg: err }));
// });

// const listEndpoints = require("express-list-endpoints"); // npm i express-list-endpoints
// console.log(listEndpoints(app)); // where app = express();

// app.listen(port, () => console.log(`App listening on port ${port}!`));

// module.exports = app;


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require("mongoose");

const { collegeModel } = require("./connector");

app.get("/findColleges", (req, res) => {
  let searchName = !req.query.name ? "" : req.query.name;
  let searchState = !req.query.state ? "" : req.query.state;
  let searchCity = !req.query.city ? "" : req.query.city;
  let searchCourse = !req.query.course ? "" : req.query.course;
  let searchExam = !req.query.exam ? "" : req.query.exam;

  collegeModel
    .find({
      name: new RegExp(searchName, "i"),
      state: new RegExp(searchState, "i"),
      city: new RegExp(searchCity, "i"),
      course: new RegExp(searchCourse, "i"),
      exam: new RegExp(searchExam, "i"),
      minPackage: { $gte: 10.5 },
      maxFees: { $lte: 10 }
    })
    .then((collegeMod) => res.status(200).send(collegeMod));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;