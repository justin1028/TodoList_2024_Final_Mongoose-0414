//「Mongoose NPM 教學」在練習這一段 

const http = require("http");
const { v4: uuidv4 } = require("uuid");
const errorHandle = require("./errorHandle");
const successHandler = require("./successHandle");




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

const getRoom = require("./getRoom");
const postRoom = require("./postRoom");
const deleteRoom = require("./deleteRoom");
const patchRoom = require("./patchRoom");

//Room -->rooms  改小寫加s

 const rooms = [];



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

    console.log('get');
    getRoom(req, res);

  } else if (req.url == "/rooms" && req.method == "POST") {
 
    console.log('post');
    postRoom(req, res);

  } else if (req.url == "/rooms" && req.method == "DELETE") {

    deleteRoom(req, res,0)
  } else if (req.url.startsWith("/rooms/") && req.method == "DELETE") {
    
    deleteRoom(req, res,1)
  
  } else if (req.url.startsWith("/rooms/") && req.method == "PATCH") {
    console.log("Patch");
    patchRoom(req, res);
  }
}

//Local端 可以 http://localhost:3005/rooms 進行測試
//留意DB連線字串設定在config.env  這個連線字串 是使用設在 Cloud 上的Mogoonse alias 中的連線資訊
//佈署到Render之後,也是讀此遠端DB
//要在compass 查看的話,可先去Mogoonse alia 設定連線到compass
const server = http.createServer(requestLister);
server.listen(process.env.PORT||3005);
