const mongoose = require('mongoose')

if(process.argv.length<3){
    console.log('Enter password')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullStack:${password}@cluster0-u9vux.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url ,{ useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name : String,
    number : Number
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5)
{
    const person = new Person({
        name : process.argv[3],
        number : process.argv[4]
    })
    
    person.save().then(response =>{
        console.log(`added ${response.name} number ${response.number} to phonebook` )
        mongoose.connection.close()
    })    
}
else if(process.argv.length === 3)
{
    console.log("Phonebook:")
    Person.find().then(result =>{
        result.forEach(person =>{
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
else{
    console.log('Enter correct number of arguments')
    mongoose.connection.close()
}
