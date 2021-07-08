import express from 'express'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import bodyParser from 'body-parser'
import cors from 'cors'
let json = require('../data/MOCK_DATA.json').data

const router = express.Router();
router.use(bodyParser.json())
router.use(cors({
    origin: '*'
}))

router.get('/', (req, res) => {
    res.send(json)
})

router.post('/', (req, res) => {
    const user = req.body
    if (user.hasOwnProperty('first_name') && user.hasOwnProperty('last_name')) {
        user.id = json[json.length - 1].id + 1 //i got too lazy with using uuid lib
        json.push(user)
        res.send(user)
    } else {
        res.send('invalid body')
    }
})

router.delete('/:id', (req, res) => {
    json = json.filter(x => x.id != req.params.id)
    res.send(req.params.id)
})

router.get('/:id', (req, res) => {
    const item = json.filter(x => x.id == req.params.id)
    res.send(item[0])
})

router.post('/update/:id', (req, res) => {
    const propName = req.body.propName
    const propValue = req.body.propValue
    json = json.map((x) => {
        if (x.id == req.params.id) {
            x.details[propName] = propValue
        }
        return x
    })
    let item = json.filter(x => x.id == req.params.id)[0]
    res.send(item)
})

router.post('/delete-prop/:id', (req, res) => {
    const propName = req.body.propName
    json = json.map((x) => {
        if (x.id == req.params.id) {
            delete(x.details[propName])
        }
        return x
    })
    let item = json.filter(x => x.id == req.params.id)[0]
    res.send(item)
})

export default router