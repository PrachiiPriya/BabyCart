require('dotenv').config();
const mongoose=require('mongoose')

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const mongoURL=`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@ecommerce-web.ugs41eb.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce-web`


mongoose.connect(mongoURL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

const db=mongoose.connection;

db.on('connected',()=>{
  console.log('Connected to MongoDB server')
});
db.on('error',(err)=>{
  console.log('MongoDB connection error',err);
});
db.on('disconnected',()=>{
   console.log('disonnected to MongoDB server')
})
module.exports=db;