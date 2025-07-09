import express from 'express'
import cors from 'cors'
import * as path from "node:path";
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/lottery', (req, res) => {
    res.sendFile(path.join(process.cwd(),'data.json'));
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})