var express = require("express"),
app = express(),
bodyParser = require('body-parser'),
noticia = require('./models/doc');

var port = 5050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine','jade');

app.get('/',function(req,res){
    res.send('Hola Mundo!');
});

//Solo Url
app.get('/news_listar',noticia.showAll);

//Con vistas
app.get('/news',noticia.show);

app.post('/news_crear',noticia.create);
app.get('/news_crear',function(req,res){
    res.render('crear');
});

app.get('/news_detail',noticia.show);

app.get('/news_update',noticia.edit);
app.post('/news_update',noticia.update);

app.post('/news_remove',noticia.delete);

 

app.listen(port,function(){
    console.log('Iniciando lab 11! escuchando en el puerto:'+port);
});