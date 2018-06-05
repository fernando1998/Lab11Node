var mongoose = require('mongoose'),
Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/blog');

var noticia_schema = new Schema({
    titulo: String,
    descripcion: String,
    categoria: String,
    fecha: String,
    comentarios: [{ autor: String, mensaje: String, fecha: String }]
});

noticia_model = mongoose.model('noticias',noticia_schema,'noticias');

module.exports = {
    showAll: function(req,res){
        noticia_model.find({},function(err,items){
            if(!err){
            // res.secmdnd(items);
            res.send(items);
            }else{
                return console.log(err);
            }
        });
    },
    show: function(req,res){
        if(req.query._id == null){
            noticia_model.find({},function(err,items){
                if(!err){
                // res.secmdnd(items);
                res.render('index',{data: items});
                }else{
                    return console.log(err);
                }
            });
        }else{
            noticia_model.findOne({_id: req.query._id},function(err,items){
                if(!err){
                    res.render('detalle',{data: items});
                }else{
                    return console.log(err);
                }
            }); 
        }
    },
    create: function(req,res){
        var item = {
           
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            fecha: req.body.fecha
        };
        var nuevo = new noticia_model(item).save();
        res.redirect("/news");
    },
    viewComment:function(req,res){
        noticia_model.findOne({_id: req.query._id},function(err,items){
            if(!err){
                res.render('crearComentario',{data: items});
            }else{
                return console.log(err);
            }
        }); 
    },
    createComment: function(req,res){
        noticia_model.findOne({_id: req.body._id},function(err,noticia){
            noticia.comentarios = [
                {   autor: req.body.autor, 
                    mensaje: req.body.mensaje, 
                    fecha: req.body.fecha 
                }]
            noticia.save();
            res.redirect('/news');
        });
    },
    edit: function(req,res){
        noticia_model.findOne({_id: req.query._id},function(err,items){
            if(!err){
                res.render('editar',{data: items});
            }else{
                return console.log(err);
            }
        }); 
    },
    update: function(req,res){
        noticia_model.findOne({_id: req.body._id},function(err,noticia){
            noticia.titulo = req.body.titulo;
            noticia.descripcion = req.body.descripcion;
            noticia.categoria = req.body.categoria;
            noticia.fecha = req.body.fecha;
            noticia.save();
            res.redirect('/news');
        });
    },
    delete: function(req,res){
        noticia_model.findOne({_id: req.query._id},function(err,noticia){
            noticia.remove();
            console.log('Se borró con éxito!');
            res.redirect("/news");
            //res.send({status:true});
        });
    },
};