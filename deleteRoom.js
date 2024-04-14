const Room           = require('./models/room');
const { v4: uuidv4 } = require("uuid");
const errorHandle    = require("./errorHandle");
const successHandle  = require("./successHandle");

//async function deleteRoom(res,rooms ,req=null) {
    async function deleteRoom(req,res ,path=0) {
    console.log("req"+req.url);
       if (path==0){
        console.log('09');
        const rooms = await Room.deleteMany({});
        
        successHandle(res, rooms);
       } else {
            try {
                console.log('15');
            const id = req.url?.split("/")?.pop();
            const result = await Room.findByIdAndDelete(id);
      
            successHandle(res, result);
           } catch (error) {
            errorHandle(res);
           }

       }
       
 
      
      
  };
  module.exports = deleteRoom;