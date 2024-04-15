const Room           = require('./models/room');
const { v4: uuidv4 } = require("uuid");
const errorHandle    = require("./errorHandle");
const successHandle  = require("./successHandle");




async function getRoom(req, res) {
  try {
      const rooms = await Room.find();
      successHandle(res, rooms);

     }catch (error) {
  
        errorHandle(res,error);
             
     }
};
module.exports = getRoom;