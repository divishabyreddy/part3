const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url,{useNewUrlParser : true, useUnifiedTopology : true}).then(result =>{
    console.log("connected to mongoDB")
}).catch(e =>{
    console.log("Error in connection")
})

const personSchema = new mongoose.Schema({
    name : { type : String, required : true ,unique : true , minlength : 3 },
    number : {type :Number, required: true, minlength : 8 }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person',personSchema)