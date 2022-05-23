const express = require('express');
var bodyParser = require('body-parser');
const multer=require('multer')
const { AppConfig } = require('aws-sdk');

const route = require('./src/route/route');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())

mongoose.connect("mongodb+srv://saurabh042160:iafSq7ML1zCfugKI@cluster1.ymdh1.mongodb.net/group-58XDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB_connected"))
    .catch(err => console.log(err))
app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

