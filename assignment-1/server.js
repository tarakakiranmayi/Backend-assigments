const exp=require('express');
const app=exp();
app.listen(4000,()=>console.log("running"))
app.use(exp.json());
const userApp=require('./API/users');
const productApp=require('./API/products');
app.use('/user-api',userApp);
app.use('/product-api',productApp);
app.use((err, req, res, next) => {
    res.send({ errMessage: err.message });
  });
  let userCollectionObj;
  const mc=require('mongodb').MongoClient
  mc.connect('mongodb://127.0.0.1:27017')
.then(client=>{
    const dbobj=client.db('a1')
    const userCollectionObj=dbobj.collection('userCollection')
   
  app.set('userCollectionObj',userCollectionObj)
 
  console.log("DB connction success")
})
.catch(err=>{
    console.log(err)
   });