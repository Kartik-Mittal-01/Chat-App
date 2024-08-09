const mongoose = require("mongoose");

main().then(()=> {console.log("connection succedded!")})
.catch(err=>{console.log(err)});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
const Chat = require("./models/chat.js");

let allchats=[
    
]
    
Chat.insertMany(allchats);


