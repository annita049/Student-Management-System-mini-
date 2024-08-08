const express = require('express');
const router = express.Router();  // router object is an instance of express.Router()
const Student = require('../Models/student');

router.get('/home',(req, res)=>{
    res.render('layout',{
        title: 'Home Page',
        body: 'pages/home'
    });
});  
// routers.get() adds a new route to the routers object

router.get("/students", async(req, res)=>{
    const students = await Student.find();
    res.render('layout',{
        title: 'Student Records',
        body: 'pages/all_students',
        students: students
    });
});

router.get("/view/:obj_id", async(req, res)=>{
    const id = req.params.obj_id;   // unique object id
    const student = await Student.findOne({_id: id});
    res.render("student_view",{student: student});
});

router.get("/add",(req, res)=>{
    res.render('layout',{
        title: 'Add new Student',
        body: 'pages/add_student',
    });
});

router.post('/add', async(req, res)=>{
    const student = new Student({
        id: req.body.id,
        name: req.body.name,
        cgpa: req.body.cgpa,
        department: req.body.department
    });

    // executed by async-await
    await student.save();

    // executed by promise
    // student.save()
    // .then(()=> console.log("data saved successfully"))
    // .catch((err)=> console.log("error saving data!",err)); // blocking call
    res.redirect('/students');
});

router.post('/delete', async(req, res)=>{
    const obj_id = req.body.obj_id;  // object unique id
    // console.log(id);
    try{
        await Student.deleteOne({_id: obj_id});
        res.json({success: true, msg: "Student info deleted successfully!"});
    }
    catch(err){
        console.log(err);
        res.json({success: true, msg: "failed deleting student data"});
    }
});


router.get("/edit/:id", async(req, res)=>{
    const _id = req.params.id;   // unique object id
    const student = await Student.findOne({_id: _id});
    res.json(student);
    // res.render('layout',{
    //     title: 'Student Records',
    //     body: 'pages/all_students',
    //     student: student
    // });
});

router.post('/edit', async(req, res)=>{
    const {_id, id, name, cgpa, department} = req.body;

    try {

        response = await Student.updateOne(
            {_id: _id},
            {$set: {id, name, cgpa, department}}
        );

        // res.status(200).json({success: true});
        if(!response.matchedCount) res.status(200).send("<h1>No Match Found!</h1>");
        // res.send(response);
        res.redirect('/students');
    }
    catch(err){
        console.log("can't update data!", err);
        res.status(500).json({success: false});
    }
});

// --- implementing search method ---


router.get('/search', async (req, res)=>{
    const query = req.query;

    try {
        // res.json(query);
        const students = await Student.find(query);
        // res.status(200).render('layout',{
        //     title: 'Search Students',
        //     body: 'pages/search_result',
        //     students: students
        // });        
        res.status(200).json(students);
    }
    catch(err){
        res.status(404).send("Not found!");
    }
});

module.exports = router;