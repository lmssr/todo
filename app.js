const express = require('express');
const session = require('cookie-session'); // Charge le middleware de sessions
const bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}));

app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
});

app.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
});

app.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
});

app.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
});

app.use(function(req, res, next){
    res.redirect('/todo');
});


app.listen(8080);
