const express = require('express');
const mongoose = require('mongoose');
const panRoute=require('./routes/panRoute.js')
const app = express();
app.use(express.json());
const cors=require('cors')
app.use(cors())
let corsOptions={
    orgin:['http://localhost:4500']
}
const port = 4500;
url = "mongodb://localhost:27017/nsdl";
app.listen(port, () => {
  console.log("server is running on port", port);
});
mongoose
  .connect(url)
  .then(console.log("data base connected"))
  .catch((err) => {
    console.log("db is not connected");
  });
app.use('/pancard', cors(corsOptions) ,panRoute)