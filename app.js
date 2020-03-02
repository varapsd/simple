const express = require('express');
const app = express();
var fs = require('fs');
var path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req,res)=>{
	fs.readFile('form.html', function(err,data){
		if (err) throw err ;
		res.sendFile(path.join(__dirname + '/form.html'));
	});
});
 
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/signup',{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
	console.log("connectedtodb");
});

var PostSchema = mongoose.Schema({
	name : String,
	email : String,
	phone : String,
	course : String,
});

var user = mongoose.model('emp', PostSchema);
app.post('/',urlencodedParser,(req,res)=>{
	const usr = new user(req.body);

	usr.save()
	.then(data =>{
		res.send('added');
	});
	});
app.listen(3001);