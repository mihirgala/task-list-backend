const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const conn = require('./db')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.listen(4000, () => {
    console.log('Backend server running on port 4000')
})

app.get('/tasks',(req,res)=> {
    const QUERY = `SELECT * from tasks`
    conn.query(QUERY,(err,responce)=>{
        if(err){
            res.send({status:500})
        }
        else{
            res.send(responce)
        }
    })

})

app.post('/addTask',(req,res) => {
    const QUERY = `INSERT INTO tasks (Task) VALUES ('${req.body.task}')`

    conn.query(QUERY,(err)=>{
        if(err){
            console.log(err)
            res.send({status:500,message:err})
        }
        else{
            console.log(req.body.task + ' added to list !Success')
            res.send({status:200,message:'Success'})
        }
    })
})

app.delete('/deleteTask/:taskId',(req,res) => {
    const QUERY = `DELETE FROM tasks WHERE (taskId = ${req.params.taskId})`
    conn.query(QUERY,(err)=>{
        if(err){
            console.log(err)
            res.send({status:500,message:err})
        }
        else{
            console.log(req.params.taskId + ' Deleted from list !Success')
            res.send({status:200,message:'Success'})
        }
    })
})

