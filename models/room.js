const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema(
    {
      name: String,
      price: {
        type: Number,
        required: [true, "價格必填"]
      },
      rating: Number,
      createAT:{
          type:Date,
          default:Date.now,
          select :false    //前台不顯示 但DB會秀
          
      }
    },
      {
        versionKey:false,  //versionKey  不顯示
        //timestamps:true  //顯示預設的Create time  |update time
      }   
  )
  const Room = mongoose.model('Room',roomSchema);

  module.exports = Room;
