// IMPORTS FROM PACKAGES
const express = require('express');
const mongoose = require('mongoose')


// IMPORTS FROM OTHER FILES
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

//INIT
const PORT = process.env.PORT || 3000;
const app = express();
const DB = "mongodb+srv://vinay:vinaymongodb@cluster0.nm6pt5v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MIDDLEWARES
// CLIENT -> MIDDLEWARE -> SERVER -> CLIENT
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

// Connection
mongoose.connect(DB).then(() => {
  console.log("connection successful");
}).catch(e => {
  console.log(e);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});  
