import usersRoutes from './routes/users.js'


import express from 'express'
const app = express()

const PORT = 3000;

app.use('/users', usersRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))