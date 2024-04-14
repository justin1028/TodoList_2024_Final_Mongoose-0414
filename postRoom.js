const Room           = require('./models/room');
const { v4: uuidv4 } = require("uuid");
const errorHandle    = require("./errorHandle");
const successHandle  = require("./successHandle");

async function postRoom(req, res) {
    try {
        req.on("end", async () => {
            try {
             
            //   console.log(body);
              const data = JSON.parse(body);
      
              const newRoom = await Room.create(
                {
                  name: data.name,
                  price: data.price,
                  rating: data.rating
                }
              )
              successHandle(res, newRoom);
      
            } catch (error) {
                errorHandle(res,error);
      
            }
          });



    }catch (error) {
        console.log(error);     
        errorHandle(res);
             
     }
};
module.exports = postRoom;