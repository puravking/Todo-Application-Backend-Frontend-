// {
//     title:String,
//     description:string,
//     completed boolean
// }
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kumarpurav59:puru__123@cluster0.f5dpn.mongodb.net/');
const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
});
const todo = mongoose.model('todos',todoSchema);
module.exports = {
    todo
}
