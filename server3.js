//「Mongoose NPM 教學」在練習這一段 

const http = require("http");
const { v4: uuidv4 } = require("uuid");
const errorHandle = require("./errorHandle");
const successHandler = require("./successHandle");

const getRoom = require("./getRoom");
const postRoom = require("./postRoom");
const deleteRoom = require("./deleteRoom");
const patchRoom = require("./patchRoom");


const dotenv =require("dotenv");
dotenv.config({path:"./config.env"});
//console.log(process.env);

const Room = require('./models/room');

const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/hotel')

const DB= process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)




//mongoose.connect('mongodb+srv://dbadmin:1qaz2wsx@cluster0.rim1f.mongodb.net/hotel?retryWrites=true&w=majority&appName=Cluster0')

mongoose.connect(DB)
  .then(
    () => { console.log('DB Connect success') })
  .catch((error) => {
    console.log('DB Connect fail')
  }  //此段測試需要久一點時間才回回覆
  );

//Room -->rooms  改小寫加s

//const todos = [];



const requestLister = async (req, res) => {
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json",
  };

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });



 

  if (req.url == "/rooms" && req.method == "GET") {

  
    getRoom(req, res);

  } else if (req.url == "/rooms" && req.method == "POST") {
  
   
    postRoom(req, res);
  } else if (req.url == "/rooms" && req.method == "DELETE") {

    deleteRoom(res, rooms);
  } else if (req.url.startsWith("/rooms/") && req.method == "DELETE") {
    // const id = req.url.split("/").pop();

    // Room.findByIdAndDelete(id)
    //   .then(() => {
    //     console.log("刪除成功");
    //     res.writeHead(200, headers);
    //     res.write(
    //       JSON.stringify({
    //         "status": "delete success",
    //         rooms: []
    //       })
    //     ); res.end();

    //   })
    //   .catch((error) => { console.log("刪除fail"); })

    // console.log(id);
  
  } else if (req.url.startsWith("/rooms/") && req.method == "PATCH") {
  
  patchTodo(req, res);
  }
}

const server = http.createServer(requestLister);
server.listen(process.env.PORT||3005);
