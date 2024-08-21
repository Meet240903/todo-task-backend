const mongoose=require('mongoose');
const db = process.env.DB

async function connectToMongo() {
    await mongoose.connect(`${db}`,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
  
module.exports = connectToMongo;