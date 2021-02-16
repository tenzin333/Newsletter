const  express = require("express");
const app = express();
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.post("/errorPg",function(req,res){
        res.redirect("/");
})


app.post("/",function(req,res){

        const email  = req.body.email;
        const pwd = req.body.password;
        const data ={
            members:[
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields:{
                        PASSWORD:pwd
                    }
                
                }
            
                

                
            ]
        }

        const jsonData = JSON.stringify(data);
        const url = "https://us1.api.mailchimp.com/3.0/lists/deb766a61a"


        const option ={
            method:"POST",
            auth: "thing:702cda8658f5813e31b8006ea26630ed-us1"
        }




  const request =       https.request(url,option,function(response){

        if(response.statusCode==200){
            res.sendFile(__dirname+"/successPg.html");
        }
        else{
            res.sendFile(__dirname+"/errorPg.html");
        }

            response.on("data",function(data){

                console.log(JSON.parse(data));
                


                })

        })

        request.write(jsonData);
        request.end();


 
})



app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");

})



app.listen(process.env.PORT || 3000,function(){
    console.log("server running on port:3000");
})


//apiKEy:702cda8658f5813e31b8006ea26630ed-us1