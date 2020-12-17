const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require('mongoose');

const collegeSchema = require('./schema');
const { ReplSet } = require('mongodb');

app.get('/findColleges', (req,res)=>{

    // name, state, city, minPackage, maxFees, course and exams
    let {name, state, city, minPackage, maxFees, course, exams} = req.body;
    collegeSchema.find({name : {$regex : `/${name}.line/`, $options: 'si'}, 
        state: {$regex : `/${state}/` , $options: 'i'},
        city: {$regex: `/${city}/`, $options: 'i'},
        minPackage : {$gte : Number(minPackage)},
        maxFees : {$lte: Number(maxFees)},
        course: {$regex: `/${course}/`, $options: 'i'},
        exams: {$regex: `/${exams}.line/`, $options: 'si'} 
        })
        .then(result=> res.send(result))
        .catch(error=> res.status(400).send('college not found'));

});

app.listen(port, () => console.log(`App listening on port ${port}!`))