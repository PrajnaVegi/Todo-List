import express from "express"
import bodyParser from "body-parser"
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var list1 = [];
var list2 =[];




app.listen(3000, () =>{
    console.log("server at port 3000");
})

app.get("/", (req,res) =>{
    const today = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = days[today.getDay()]
    let date = today.getDate()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let m = months[today.getMonth()]
   
   

    res.render("index1.ejs" ,{
        newList1 : list1,
        currentDay : d,
        currentMonth : m,
        currentDate : date
     });  

});

app.get("/work", (req,res) =>{
    const today = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = days[today.getDay()]
    let date = today.getDate()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let m = months[today.getMonth()]
   
    res.render("index2.ejs", {
        newList2 : list2,
        currentDay : d,
        currentMonth : m,
        currentDate : date
    });


});

app.post("/", (req,res)=>{
    const checkT = req.body["itemT"];
    list1.push(checkT)

    const today = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = days[today.getDay()]
    let date = today.getDate()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let m = months[today.getMonth()]
   

    


    res.render("index1.ejs", {
        newList1 : list1 ,
        currentDay : d,
        currentMonth : m,
        currentDate : date
     
    })
})

app.post("/work", (req,res)=>{
    const checkW = req.body["itemW"];
    list2.push(checkW);

    const today = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = days[today.getDay()]
    let date = today.getDate()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let m = months[today.getMonth()]
   
    
    res.render("index2.ejs", {
        newList2 : list2,
        currentDay : d,
        currentMonth : m,
        currentDate : date
    })
})

