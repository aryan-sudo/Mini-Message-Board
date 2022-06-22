//const { Console } = require("console");
const express = require("express");
const app = express();
const engine = require("ejs-mate");
const PORT = process.env.PORT || 8080;
//const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
// const User = require('./models/commentModel');
const commentRoutes = require('./routes/commentRoutes');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/data');
}





const path = require('path');
//const { getUnpackedSettings } = require("http2");
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')))


app.use('/comments', commentRoutes);



app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
