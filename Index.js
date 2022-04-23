const express = require("express");
const app = express();
const path = require('path');
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs");


let comments = [
    {
        id : uuidv4(),
        username : "Todd",
        comment : "My wife dumped me the other night"
    },
    {
        id : uuidv4(),
        username : "BroSlayer666",
        comment : "That's depressing"
    },
    {
        id : uuidv4(),
        username : "Johnnyboi",
        comment : "Did she take everything?"
    },
    {
        id : uuidv4(),
        username : "Fatal_Kitty",
        comment : "Dont let her win!"
    },
    {
        id : uuidv4(),
        username : "Todd",
        comment : "I got to keep the PT Cruiser at least lol :("
    }
]

app.get("/comments", (req, res) => {
    res.render("comments/index", {comments});
})

app.get("/comments/new", (req, res) => {
    res.render("comments/new");
})

app.post("/comments", (req, res) => {
    //console.log(req.body);
    const {username, comment} = req.body;
    comments.push( { username, comment, id: uuidv4() } );
    //res.send("It Worked");
    res.redirect(302, "/comments")
})

app.get("/comments/:id", (req, res) => {
    const {id} = req.params;
    const comment = comments.find( c => c.id === id);
    res.render("comments/show", { comment });
})

app.get("/comments/:id/edit", (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/edit", {comment});
})

app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect("/comments");
})

app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    //const foundComment = comments.find(c => c.id === id);
    comments = comments.filter(c => c.id != id);
    res.redirect("/comments");
}) 







let port = 3000;
app.listen(port, () => {
    console.log("Listening on port ", port);
    //console.log(comments.length)
})

