const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
var db = router.db.read('./db.json')['__wrapped__'];
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

  
  server.post(['/cart','/orders','/users'],(req,res,next)=>{
    req.body.id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
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
              result.push({id:item.id,title:cloth.title,Price:cloth.Price,img:cloth.img})
            }
          }
        })

    });
    res.status(200).send(JSON.stringify({response:result}));
  });

  server.post('/api/orders', (req, res) => {
    let result=[]

    console.log('LOL',db.orders);
    res.status(200);
  });

  server.use(router);
  server.listen(port,()=>console.log(
    '***********************SERVER LISTNING AT PORT ',port,'***********************'
  ));


























    // server.post(['/orders'],(req,res,next)=>{
  //   req.body.id=req.body.email;
  //   next();
  // });

  // server.post(['/users'],(req,res,next)=>{
  //   req.body.id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  //   console.log(req.body);
  //   next();
  // });