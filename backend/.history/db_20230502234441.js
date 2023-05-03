const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = ()=>{
   mongoose.connect(mongoURI).then(()=>{
    console.log('Now we are connected');
   })
}

module.exports = connectToMongo;