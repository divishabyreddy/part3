const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(express.static('build'))
// app.use(morgan('tiny'))
app.use(cors())
morgan.token('body',function (req,res){
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status  :res[content-length]  - :response-time ms  :body '))
let persons =[
    { name: "Arto Hellas", number: "1234567890", id:1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id:2 },
    { name: "Dan Abramov", number: "12-43-234345",id:3 },
    { name: "Mary Poppendieck", number: "39-23-6423122",id:4 }
]

app.get('/',(req, res)=>{
    res.send('<p>Hello world!</p>')
} )


app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person =>{
       return person.id===id
})
if(person){
    response.send(person)
}
else{
    response.status(404).end()
}
})

app.get('/info',(request,response)=>{
    const date =new Date().toString()
    response.send(`
    <div>
    <p>phonebook has details of ${persons.length} people</p>
    <p>${date}</p>
    </div>`)
})

app.delete('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () =>{
    return Math.floor(Math.random()*Math.floor(1000))
}

app.post('/api/persons',(request,response)=>{
    const body = request.body
    const names = persons.map(person => person.name)
    if(!body.name || !body.number ){
        return response.status(400).json({
            error : "content missing"
        })
    }
    else if(names.indexOf(body.name)>-1){
        return response.status(400).json({
            error: "Name already exists in the phonebook"
        })
    }
    const person = {
        name : body.name,
        number : body.number,
        id : generateId(),
    }
   persons=persons.concat(person)
   response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)