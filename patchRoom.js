const Room           = require('./models/room');
const { v4: uuidv4 } = require("uuid");
const errorHandle    = require("./errorHandle");
const successHandle  = require("./successHandle");

async function  patchRoom(req, res) {
  console.log("Patch in");
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

req.on("end",  () => {
    console.log('update one');
    try {
      const name = JSON.parse(body).name;
      const id = req.url.split("/").pop();

      if (name !== undefined) {
        Room.findByIdAndUpdate(id, { "name": name })
          .then(() => {
            console.log("update success")

        
          });
      } else {
        console.log("name error")
      }
      res.end();
    }catch(error){
      res.writeHead(400, headers);
      res.write(
        JSON.stringify({
          status: "False",
          message: "欄位未填寫正確,或無此todo id",
          error :error
        })
      ); res.end();
    }
});

};

module.exports = patchRoom;