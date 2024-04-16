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
                   //請特別留意result 更新後竟然是undefined 並沒有回傳值 這個坑很大,所以上方successHandle(res,result) 執行會有異常
                   console.log(result) 
                   //以下寫法雖然可以取得所有資料,但有盲點就是沒更新也會取回資料 會誤以為修改成功
                   //再度改寫
                   const idObject = { _id: id };
                   const data = await Room.find(idObject);  //find 要傳入一個物件
                   successHandle(res,data)
                         
                      }


                else {
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