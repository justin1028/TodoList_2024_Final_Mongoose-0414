const Room           = require('./models/room');
const { v4: uuidv4 } = require("uuid");
const errorHandle    = require("./errorHandle");
const successHandle  = require("./successHandle");

async function deleteRoom(req, res) {
    try {
        console.log("88");
        console.log(req);
        const rooms = await Room.deleteMany({});
      
        successHandle(res, rooms);
 
       }catch (error) {
         
          errorHandle(res,error);
               
       }
  };
  module.exports = deleteRoom;