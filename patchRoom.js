const Room           = require('./models/room');
const { v4: uuidv4 } = require("uuid");
const errorHandle    = require("./errorHandle");
const successHandle  = require("./successHandle");

console.log('06');
async function  patchRoom(req, res) {
  console.log("Patch in");
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

req.on("end",  async () => {
    console.log('update one');
    try {
         const name = JSON.parse(body).name;
         const price = JSON.parse(body).price;
        
         const rating = JSON.parse(body).rating;
        // console.log ("name"+name);
        // console.log ("price"+price);
        // console.log ("rating"+rating);
        const id = req.url.split("/").pop();

         if (name !== undefined) {
            // const result = await  Room.findByIdAndUpdate(id,{ "name": name})
             const result = await Room.findByIdAndUpdate(id, { "name": name,"price":price,"rating":rating }, { new: true }) 
             .then(() => {
                      console.log("update success")                   
                     // successHandle(res,result);  
                   })
                   console.log(result) //請特別留意result 更新後竟然是undefined,所以successHandle(res,result) 執行會有異常
            }    else {
                 console.log("update error")
                 return error
            }
            res.end();
        
    }catch(error){
      console.log("patch 33");
      console.log(error);
      errorHandle(res,error);
      res.end();
    }
  });
  
    
};

module.exports = patchRoom;