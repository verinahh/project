const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'password',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}))

app.set("view engine", "ejs")


app.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/dashboard") 
    }
    res.render("login", { error: null })
})

app.post("/login", (req, res) => {
    const { username } = req.body 

    if (!username) {
        return res.render("login", { error: "Username is required" })
    }

    req.session.user = username
    res.redirect("/dashboard")
})


app.listen(PORT, () => {
    console.log(`serveri eshte startuar ne portin ${PORT}`)
})
