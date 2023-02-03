const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://student-manager:qmEeTiGzrE0ZLFrw@cluster0.k8emzbd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.get('/', (req,res) => {
    res.send("Student Server")
})
async function run(){
    try{
        const studentCollection = client.db("student-manager").collection("students")
        app.post('/students', async(req,res) => {
            const student = req.body;
            const result = await studentCollection.insertOne(student)
            res.send(result)
        })

        app.get('/students', async(Req, res) => {
            const q = {};
            const students = await studentCollection.find(q).toArray();
            res.send(students);
        })
    }
    finally{}
}

run().catch(err => console.log(err))


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})