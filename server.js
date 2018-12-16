const express=require('express')
const app=express();
const http=require('http');
const server=http.createServer(app);
const socketio=require('socket.io');
const io=socketio(server);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const NewsAPI = require('newsapi');
const {key}=require('./exports')
const newsapi = new NewsAPI(key);
const port=process.env.PORT||3000
var path= require('path');
app.set('view engine','hbs');
app.use('/',express.static(path.join(__dirname,"/public_static")));
// app.get('/',(req,res)=>{
//     res.redirect('/india')
// })
app.get('/',(req,res)=>{
res.sendFile(__dirname+'/public_static/index.html')
})
// app.get('/:q',(req,res)=>{
//     newsapi.v2.topHeadlines({
//         q:req.params.q,
//         language:'en'
//       }).then((response)=>{
//           console.log(response)
//           articles=response['articles'];
//           for(i in articles){
//               title=articles[i]['title']
//           des=articles[i]['description']
//           console.log(title)
//           console.log(des)    
//       }
//       res.render('newsfeed',{articles:articles})
//       })      
// })
io.on('connection',(socket)=>{
    socket.emit('connect')
    socket.on('send',(data)=>{
    msg=data.message;
    newsapi.v2.topHeadlines({
                q:msg,
                language:'en'
              }).then((response)=>{
                  articles=response['articles'];
              io.to(socket.id).emit('news',articles);
              })      
    }
    )
  })
  
  server.listen(port,()=>{
    console.log("listening at http://localhost:2000")
  })
