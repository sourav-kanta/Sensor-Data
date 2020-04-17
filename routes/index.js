var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const mongoURI ='mongodb://souravk:Sourav123!@ds213338.mlab.com:13338/jarvis-api';

mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true});
var conn = mongoose.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  //console.log(req.body);
  var data1=JSON.stringify(req.body);
  data1.replace('$(source)_name','name');
  data1.replace('$(source)_id','id');
  //console.log(data1);
  data=JSON.parse(data1);
  for(var i=0;i<data.length;i++)
  {
  	var time=data[i].eventTime;
  	var sensor = data[i].payload.data.Temperature;
  	var machine_key=Object.keys(data[i].payload.data);
  	var machine = data[i].payload.data[machine_key[1]];
  	console.log(time+" "+machine+" "+sensor);
  	var payload ={
  		"_id" : time,
  		"machine" : machine, 
  		"data" : sensor
  	};
  	conn.collection('Sensor_Data').insert(payload);
  }
  res.sendStatus(200);
});

module.exports = router;
