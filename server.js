const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db1.json');
var db = require('./db1.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

  server.get('/api/cloth', (req, res) => {
    let result=[]

    db.cloth.find(clothes => {
        result.push(clothes);
    });
    res.status(200).jsonp(result);
  });

  
  server.post(['/cart'],(req,res,next)=>{
    req.body.id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    db.cart.push(req.body);
    console.log(req.body);
    next();
  });

  server.post(['/Orders'],(req,res,next)=>{
    // req.body.id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    req.body.id=req.body.email;
    // db.cart.push(req.body);
    console.log(req.body);
    next();
  });

  server.post(['/users'],(req,res,next)=>{
    req.body.id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    db.users.push(req.body);
    console.log(req.body);
    // res.status(202).send(JSON.stringify({response:{email:body.email}}));
    next();
  });

  server.post('/api/users',(req,res)=>{
    let check=false;
    let email=req.body.email;
    let pass=req.body.password;
    let userr='';
    db.users.find(user=>{
      if(user.email==email){
        if(user.password==pass){
          res.status(202).send(JSON.stringify({response:{email:user.email}}));
        }
        else{
          res.status(404).send(JSON.stringify({response:'user not found'}));
        }
      }
    })
    
 });

  server.post('/api/getCart', (req, res) => {
    let email=req.body.email;
    let result=[]

    db.cart.find(item => {
        db.cloth.find(cloth=>{
          if(item.by==email){
            if(item.pid==cloth.id){
              result.push(cloth)
            }
          }
        })

    });
    res.status(200).send(JSON.stringify({response:result}));
  });


  server.use(router);
  server.listen(port,()=>console.log(
    '***********************SERVER LISTNING AT PORT ',port,'***********************'
  ));