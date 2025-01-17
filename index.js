const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended: true}));
main().then(()=> {console.log("connection succedded!")})
.catch(err=>{console.log(err)});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
    
// let chat1 = new Chat({
//     from : "kartik",
//     to : "sanyam",
//     msg : "aur bosdke",
//     created_at: new Date()
    
// })

// chat1.save();



app.get("/",(req,res)=>{
    res.send("WELCOME TO THE PAGE. USE '/chats' TO START YOUR CHATS ");
})
app.get("/chats",async (req,res)=>{
    let chats  = await Chat.find();
    res.render("index.ejs",{chats});
})
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/chats",(req,res)=>{
    let {from , to , msg} = req.body;
    let newchat = new Chat({
        from : from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newchat.save().then((res)=>{console.log("chat saved")}).catch((err)=>{console.log(err)});
    res.redirect("/chats");
})

app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit",{chat});

})

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { new: true });
    res.redirect("/chats");
});

app.delete("/chats/:id", async (req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");




})






 





















app.listen(8085,()=>{
    console.log("server is listening on port 8085..");
})