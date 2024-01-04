import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose" 

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item",itemsSchema)
const wItem = mongoose.model("wItem",itemsSchema)




app.listen(3000, () => {
    console.log("server at port 3000");
})

app.get("/", async(req, res) => {
    const today = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = days[today.getDay()]
    let date = today.getDate()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let m = months[today.getMonth()]


    const items = await Item.find({})
    return res.render("index1.ejs", {
        newList1: items,     
        currentDay: d,
        currentMonth: m,
        currentDate: date

    });
});

app.get("/work", async(req, res) => {
    const today = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = days[today.getDay()]
    let date = today.getDate()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let m = months[today.getMonth()]

    
    const witems = await wItem.find({})

    res.render("index2.ejs", {
        newList2: witems,
        currentDay: d,
        currentMonth: m,

        currentDate: date
    });

});

// app.get("/:customListName", async (req, res) => {
//     const customListName = req.params.customListName;
//     console.log(req.params.customListName)

//     const today = new Date()
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     let d = days[today.getDay()]
//     let date = today.getDate()
//     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     let m = months[today.getMonth()]

//     try { 
//         const foundList = await List.findOne({name: customListName})
//         if (!foundList) {
//             const list = new List({
//                 name: customListName,
                
//             });
//             await list.save();
//             return res.render("index1.ejs", {listTitle: list.name, newList1: list.items,currentDay: d,
//                 currentMonth: m,
//                 currentDate: date})
//         } else {
//             res.render("index1.ejs", {listTitle: foundList.name, newList1: foundList.items,currentDay: d,
//                 currentMonth: m,
//                 currentDate: date})  
//         }   
//     } catch (error) {
//         console.log(error)
//     }
//     // List.findOne({name: customListName}, (err, foundList) => {
//     //     if(!err){
//     //         if(!foundList){
//     //             const list = new List({
//     //                 name: customListName,
//     //                 items: defaultItems
//     //             });
//     //         }else{
//     //             res.render("list", {listTitle: foundList.name, newListItems: foundList.items})  
//     //         }
//     //     }
//     // })
// })

app.post("/", async (req, res) => {
    
    const checkT = req.body["item"]
    const item = new Item({
        name: checkT
    })
    item.save()
  
    const today = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = days[today.getDay()]
    let date = today.getDate()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let m = months[today.getMonth()]

    const items = await Item.find({})

    return res.render("index1.ejs", {
        newList1: items,     
        currentDay: d,
        currentMonth: m,
        currentDate: date

    })
    

})

app.post("/work", async(req, res) => {
    const checkW = req.body["itemW"];
    const witem = new wItem({
        name: checkW
    })
    witem.save()
    const today = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = days[today.getDay()]
    let date = today.getDate()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let m = months[today.getMonth()]

    const witems = await wItem.find({})
    console.log(witems)
    res.render("index2.ejs", {
        newList2: witems,
        currentDay: d,
        currentMonth: m,
        currentDate: date
    })
})

app.post("/delete", async(req, res) => {
    console.log(req.body.checkbox)
    const checkedItemId = req.body.checkbox;
    const delItem = await Item.findByIdAndRemove(checkedItemId)
    console.log(delItem)
    res.redirect("/")
    
})

app.post("/deleteW", async(req, res) => {
    console.log(req.body.checkbox)
    const checkedItemId = req.body.checkbox;
    const delItem = await wItem.findByIdAndRemove(checkedItemId)
    console.log(delItem)
    res.redirect("/work")
    
})

