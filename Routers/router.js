const express = require('express');
const router = express.Router();  // router object is an instance of express.Router()
const Student = require('../Models/student');

router.get("/home",(req,res)=>{
    res.render("home");
});  
// routers.get() adds a new route to the routers object

router.get("/students", async(req,res)=>{
    const students = await Student.find();
    res.render("student_records",{students: students});
});

router.get("/view/:id", async(req,res)=>{
    const id = req.params.id;
    const student = await Student.findOne({_id: id});
    res.render("student_view",{student: student});
});

router.get("/add",(req,res)=>{
    res.render("add_student");
});

router.post("/add", async(req,res)=>{
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
    res.redirect("/students");
});

router.post("/delete", async(req,res)=>{
    const id = req.body.id;
    // console.log(id);
    try{
        await Student.deleteOne({_id: id});
        res.json({success: true, msg: "Student info deleted successfully!"});
    }
    catch(err){
        console.log(err);
        res.json({success: true, msg: "failed"});
    }
});

module.exports = router;