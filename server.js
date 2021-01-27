// require app dependencies
const express = require('express');

// setup express server
const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());

// require app routes
const validatorapi = require('./routes/validator')

// specify root url path for app
app.use('/api/validator', validatorapi)


// configure app PORT
app.listen(port, ()=>{
    console.log(`Server is running on PORT: ${port}`);
})


module.exports = app;

