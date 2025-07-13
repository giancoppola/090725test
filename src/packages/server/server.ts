import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(process.cwd(),"src","packages","server",`.env`) })
import * as path from "node:path";
import data from './data.json'
const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use((req, _res, next) => {
    const currentDate = new Date();
    console.log(`[${currentDate.toDateString()} ${currentDate.toTimeString()}] ${req.method} ${req.url}`)
    next();
})

app.get('/', (_req, res) => {
    res.send('Hello World!')
})

app.get("/health", (_req, res) => {
    res.status(200).json({
        uptime: process.uptime(),
        msg: "OK",
        date: new Date().toDateString(),
        time: new Date().toTimeString(),
    })
})

app.get('/lottery', (_req, res) => {
    // res.sendFile(path.join(process.cwd(),'data.json'));
    res.status(200).json(data)
})

app.get("*name", (_req, res) => {
    res.status(404).send("Not Found");
})

app.listen(port, () => {
    console.log(process.env.PORT);
    console.log(`App listening on http://localhost:${port}`)
})