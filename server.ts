import express from 'express'
import cors from 'cors'
import * as path from "node:path";
const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use((req, res, next) => {
    const currentDate = new Date();
    console.log(`[${currentDate.toDateString()} ${currentDate.toTimeString()}] ${req.method} ${req.url}`)
    next();
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/health", (req, res) => {
    res.status(200).json({
        uptime: process.uptime(),
        msg: "OK",
        date: new Date().toDateString(),
        time: new Date().toTimeString(),
    })
})

app.get('/lottery', (req, res) => {
    res.sendFile(path.join(process.cwd(),'data.json'));
})

app.get("*name", (req, res) => {
    res.status(404).send("Not Found");
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})