//use path joins path segments together using the platform specific seperator
//as a delimiter, then normalizes the resulting path

const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '/../public/'); 
const port = process.env.PORT||3000; 
let app = express();
//call express static middleware
app.use(express.static(publicPath)); 
console.log(publicPath);

app.listen(port, () => {
    console.log(`Chat app running on port ${port}`);
});