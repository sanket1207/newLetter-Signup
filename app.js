//check video for start-setup -> https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/18125199#overview

//check video  for add mailchimp -> https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/18125203#overview

//check video  for add acknowledgment page's (success.html & failure.html)->https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/18125213#overview



const express = require('express');
const bodyParser = require('body-parser');
const request= require('request');
const https = require('https')

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));//it for make need file public it can be access by our other file 


app.get('/',function(req , res){
    res.sendFile(__dirname +'/signup.html');
})

app.post('/', function(req,res){
    const firstName = String(req.body.firstName);//get data from html page
    const lastName = String(req.body.lastName);//get data from html page
    const mail = String(req.body.mail );//get data from html page
    console.log("firstName: "+firstName+" lastName: "+lastName+" mail: "+mail)
    
    //check video  for add mailchimp -> https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/18125203#overview

    const data = {
        members:[
            {
                email_address: mail,
                status : "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }//make js Dictionary for send mail & name
    const jsonData = JSON.stringify(data)//this convert above JS's Dictionary  to flat string which in json format

    const url = "https://us14.api.mailchimp.com/3.0/lists/8562b8745d"//url is for Unique Identify list for mailchimp also remember to usX should match to authKey's us<number>
    const options={
        method: "POST",
        auth: "sanket:50816b654ca82a83418998e4cc4cc271-us14"//auth : "anyName: authKey"
    }//auth key for mailchimp is passed 
    const request = https.request(url, options, function(response){
        //check video  for add acknowledgment page's (success.html & failure.html)->https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/18125213#overview
        if (response.statusCode === 200) {
            res.sendFile(__dirname+'/success.html');
        }else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data" ,function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post('/failure', function (req,res) {
    res.redirect('/');
})

const port = process.env.PORT || 3000; //this use sever port when on public sever & if not then run on port 3000(for localhost)
app.listen(port , function(){
    console.log('server is running on port 3000');
})




