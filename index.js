var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var ejs = require("ejs");
const path=require('path');


app.use(express.static(path.join(__dirname,'static')));
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//create a webserve rds 

const port = 3000;

var connection = mysql.createConnection({
    host: 'database-3.covqi8hsiake.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'sirvi',
    password: 'sirvi123',
    database: 'Covid19'
  })

  connection.connect(function(err){
    if(!err)
    console.log("database connected");
    else
    console.log("database not connected");
  })

  // sql1="desc Covid_details"
  // sql3="select * from covid_details ORDER BY State_Name ASC"
  // sql2="insert into covid_details values('karnataka','2022-11-30',500,10,100,400,100)";
//   sql4="delete from Covid_details"
//   sql5="ALTER TABLE Covid_details ADD PRIMARY KEY (State_Name)";
//   sql6="ALTER TABLE Covid_details DROP PRIMARY KEY;"
// sql="create database Covid19"
// sql12="use Covid19"
// sql11="create table covid_details(State_Name varchar(255),Date_of_Record date, No_of_Samples int(10), No_of_Deaths int(10), No_of_Positive int(10), No_of_Negative int(10), No_of_Discharge int(10))"

  // connection.query(sql3,function(err,res1){
  //   if(err) throw err
  //   console.log(res1)
  //     })

  app.get('/',(req,res)=>{
    sql1="select * from covid_details ORDER BY State_Name ASC";
    connection.query(sql1,function(err,res1){
        res.render('index',{res1})
        console.log(res1)
          })
   })

   app.get('/add',(req,res)=>{
    res.render('form')
   })

   app.post('/insert',(req,res)=>{
    var data=req.body;
    // console.log(data)
    sql2=`insert into covid_details values('${data.State_Name}','${data.Date_of_Record}',${data.No_of_Samples},${data.No_of_Deaths},${data.No_of_Positive},${data.No_of_Negative},${data.No_of_Discharge})`;
    sql1="select * from covid_details ORDER BY State_Name ASC";
    connection.query(sql2,function(err){
            if (err) throw err
            connection.query(sql1,function(err,res1){
                res.render('index',{res1})
                  })
          })
   })

   app.listen(port, () => {
    console.log(`app listening at ${port}`)
  })
