import express from 'express'
import bodyParser from 'body-parser';
import { router} from './routes';
var mongoose = require("mongoose")
const cors = require("cors");
const port = 8080
const app = express()

//Milddlewares
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT, POST, PATCH, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.json());
app.use(cors({
  origin:"*"
}))
app.use("/api",router)


//Database Connection
const dburl = "mongodb+srv://hamzaburhan0987:L0st1000@cluster0.igghx48.mongodb.net/Cluster0?retryWrites=true&w=majority"
mongoose.connect(dburl,{
    useNewUrlParser: true,
    useUnifiedTopology: false,
})

//Server
app.listen(port, async() => {
    return console.log(`Expres is listening at http://localhost:${port}`);
  });