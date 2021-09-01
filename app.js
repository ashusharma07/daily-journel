//jshint esversion:6
const express = require("express");
const bodyparser = require("body-Parser");
var _ = require("lodash");


const homestartingindex = "lacus Dahl demonstrated the project at the inaugural European JSConf on November 8, 2009.[29][30][31] Node.js combined Google's V8 JavaScript engine, an event loop, and a low-level I/O API.In January 2010, a package manager was introduced for the Node.js environment called npm.[33] The package manager makes it easier for programmers to publish and share source code of Node.js packages and is designed to simplify installation, updating, and uninstallation of packages.";
const aboutContent = "For a remarkable About page, all you need to do is figure out your company's unique identity, and then share it with the world. Easy, right? Of course not. Your  page is one of the most important pages on your website, and it needs to be well crafted. This profile also happens to be one of the most commonly overlooked pages, which is why you should make it stand out.";
const contactContent = "The links on the left should direct you to how to contact us or resolve problems. If you cannot find your issue listed there, you can email helpful, experienced volunteers at info-en@wikimedia.org. Please refrain from emailing about disagreements with content; they will not be resolved via email.";

let posts = [];

const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));




app.get("/", function(req,res){
    res.render('home', {
        startingindex : homestartingindex, 
        posts: posts
    }
        
        );
    
    
    
});
app.get("/about", function(req,res){
    res.render("about", {aboutpage: aboutContent});
});
app.get("/contact", function(req,res){
    res.render("contact", {contactpage :contactContent});
});
app.get("/compose", function(req,res){
    res.render("compose");
});

app.post("/compose", function(req,res){
    const post = {
        Title: req.body.postTitle,
        content: req.body.postbody
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postname", function(req,res){
    let requestedTitle = _.lowerCase(req.params.postname);
    for(var i =0; i< posts.length; i++){
        var selectedtitle = _.lowerCase(posts[i].Title);
        if(requestedTitle === selectedtitle){
           res.render("post", {
               heading: posts[i].Title,
               context: posts[i].content
                
            }
            )
        }
    }
    

            
});

app.listen(3000, function(req,res){
    console.log("started in port 3000");
});