const http = require("http");
const { v4: uuidv4 } = require("uuid");

const errorHandle = require("./errorHandle");
const successHandle = require("./successHandle");

const todos = [];

const requestLister2 = (req, res) => {
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json;charset=utf-8",
  };
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  console.log(req.url, req.method);
  if (req.url == "/todos" && req.method == "GET") {
    res.writeHead(200, headers);
    //正確的res 送回方式 傳回的是json物件需轉為String再輸出到畫面上
    res.write(JSON.stringify({
      "status": "success",
      "data": todos
    }));
    //測試是否可直接輸出字串到畫面上,會報錯,原因是傳回的是一個json物件,而非字串 不可直接輸出
    //疑問為何知道傳回是JSON物件,請看上面"Content-Type": "application/json 有寫,下面的錯誤也說應該是收到字串但卻收到傳回物件
    //    res.write(
    //    {
    //     status: "success",
    //     data: todos
    //   } )

    res.end(); //res 傳送到此結束
  } else if (req.url == "/todos" && req.method == "POST") {
    req.on('end', () => {               //監聽前端資料是否傳完了,等資料傳完後,才開始進行一下處理

      const title = JSON.parse(body).title;       // console.log (typeof body,JSON.parse(body));  //確認boby是否為字串 以及 req.body的內容是否為物件
      try {
        if (title !== undefined) {
          const todo = {
            title: title,
            id: uuidv4()
          };
          todos.push(todo);
          // r(res, todos, headers);

          //   res.writeHead(200, headers);
          //   res.write(
          //     JSON.stringify({
          //       status: "success",
          //       data: todos
          //     })
          //   );
          //   res.end();
          // }
          //＝＝＝＝＝＝＝＝＝＝到此 Server要回傳的資料設定完成,開始往前端送
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              "status": "success",
              "todos": todos
            })
          );
          res.end(); //res傳送完畢
        }
      } catch (error) {
        errorHandle(res, headers);
      }
    });


  } else if (req.url == "/todos" && req.method == "DELETE") {
        console.log("77",req.url);
         todos.length=0;
         
         res.writeHead(200, headers);
         res.write(
                  JSON.stringify({
                  "status": "success",
                  "todos": todos
                  })
         );
         res.end(); //res傳送完畢

  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
          
          const id = req.url.split("/").pop();
          const index= todos.findIndex((element) => element.id == id);
          if (index !== -1) {

          todos.splice(index,1);
          successHandle(res, todos, headers);
          
          } else {
          errorHandle(res, headers);
         }

  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {       
    req.on("end",()=>{
          const title = JSON.parse(body).title;
          const id = req.url.split("/").pop();
          const index = todos.findIndex((element)=>element.id == id);
          todos[index].title = title;
          successHandle(res, todos, headers); 
          



    });
  
  } else {
    res.writeHead(404, headers);
    res.write(JSON.stringify({
      "status": "false",
      "message": "無此網站路由082",
    }));
    res.end();
  }
};

const server = http.createServer(requestLister2);
server.listen(3005);
