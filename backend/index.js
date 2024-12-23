const express = require('express');
const app = express();
const {createTodo, updateTodo} = require('./types');
const {todo} = require('./db')
app.use(express.json());
// title
// description
//Create a todo - POST
app.post('/todo',async (req,res)=> {
    const createPayLoad = req.body;
    const parsedPayLoad = createTodo.safeParse(createPayLoad);
    if(!parsedPayLoad.success) {
        res.status(411).json({
            msg:"You sent the wrong input"
        })
        return;
    }
    //Put it in mongoDB
    await todo.create({
        title:createPayLoad.title,
        description:createPayLoad.description,
        completed:false
    });
    res.json({
        msg:"Todo created"
    });
     
});
app.get('/todos',async (req,res)=> {
    const todos = await todo.find({});
    res.json(todos);
})

app.put('/completed',async (req,res)=> {
    const updatePayLoad = req.body;
    const parsedUpdatePayLoad = updateTodo.safeParse(updatePayLoad);
    if(!parsedUpdatePayLoad.success) {
        res.status(411).json({
            msg:"Wrong inputs"
        })
        return;
    }
    await todo.update({
        _id:req.body.id
    },{
        completed:true
    })
    res.json({
        msg:"Todo has been marked completed"
    })
});
app.listen(3000);