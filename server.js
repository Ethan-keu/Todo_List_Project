// Main file for handling the server
const express = require('express');
const app = express();
const port = 4131;
const data = require('./data')

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set("views", "templates");
app.set("view engine", "pug");
app.use("/css", express.static("static/css/"));
app.use("/image", express.static("static/image/")); //Favicon location  
app.use("/js", express.static("static/js/"));

app.get('/', async(req, res) => {
    let res1 = await data.getAllItems();
    let res2 = await data.getOverDue();
    res.render('home', {data:res1, overDueList:res2});
});

app.get('/done', async(req,res)=>{
    let res1 = await data.getDoneItems(); 
    let res2 = await data.getOverDue();
    res.render('done', {data:res1, overDueList:res2});
});

app.get('/todo', async(req,res)=>{
    let res1 = await data.getItems(); 
    let res2 = await data.getOverDue();
    res.render('todo', {data:res1, overDueList:res2});
});

app.get('/register', async(req,res)=>{
    res.render('register');
});

app.patch('/isDone', async(req,res)=>{
    if(Number(req.body.id) != NaN){
        let res1 = await data.update_isDone(req.body.id);
        res.send(JSON.stringify("Confirmed Toggle"));
    }
    else{
        res.send(JSON.stringify("Error occured. Item could not be set."));
    }

});

let currDate = Date.now();
app.post('/addItem', async(req, res, next) => {
    if ("addItemTitle" in req.body && "addItemDesc" in req.body && "dueDate" in req.body) {
        let isOverDue = 0;
        if(Date.parse(req.body.dueDate) < currDate){
            isOverDue = 1;
        }
        let newItem = {
            addItemTitle: req.body.addItemTitle,
            addItemDesc: req.body.addItemDesc,
            isOverdue:Number(isOverDue),
            dueDate: req.body.dueDate
        };
        let res1 = data.addItem(newItem);
        if(res1){
            let res1 = await data.getAllItems();
            let res2 = await data.getOverDue();
            res.status(201).redirect('/todo');
        }
        else{
            res.status(400).send(JSON.stringify("")); //Item was not added correctly to the database.
        }
        
    }
    else {
        res.status(400).send(JSON.stringify("")) //Missing or incorrect properties sent
    }
});

app.delete('/deleteItem', async(req,res)=>{
    if("id" in req.body){
        let found = await data.deleteItem(req.body.id);
        if(found){
            res.status(204).send(JSON.stringify("Deleted")); 
        }
        else{
            res.status(404).send(JSON.stringify("File not Found"))
        }
    }
});

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
