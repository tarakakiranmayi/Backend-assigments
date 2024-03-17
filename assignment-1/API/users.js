const exp=require('express');
const userApp=exp.Router();
const bycryptjs=require('bcrypt')
const jsonwebtoken=require('jsonwebtoken')
const verifyToken=require('../Middleware/VerifyToken')
userApp.use((req, res, next) => {
    usersCollectionObj = req.app.get("userCollectionObj");
    next();
  });
 
  userApp.post("/new-user", async (req, res) => {

    //user from client
   const newuser=req.body
   const dbuser=await usersCollectionObj.findOne({username:newuser.username})
   if(dbuser!=null)
   {
    res.send({message:"User is there already"})
   }
   else{
    const hashedpass=await bycryptjs.hash(newuser.password,6)
    console.log(hashedpass)
    newuser.password=hashedpass

    let respsonse=await usersCollectionObj.insertOne(newuser)
    res.send({message:"user created"})
   }
  });
userApp.put("/user", (req, res) => {
    //get modified user from req
    let modifieduser = req.body;
    //get index of user with id as modifiedUser.id
    let index = usersList.findIndex((userObj) => userObj.id === modifieduser.id);
    //if index is -1
    if (index === -1) {
      res.send({ message: "User not found with this ID" });
    } else {
      //replace user with modifiedUser
      usersList.splice(index, 1, modifieduser);
      //send res
      res.send({ message: "User modified" });
    }})
    userApp.get("/users",async(req,res)=>{
      const users=await usersCollectionObj.find()
      res.send({message:"Look",payload:users})
    })
    userApp.get("/users/:username", async(req, res) => {
        // console.log(req.body)
        //get url params
        let id =req.params.username; //{ id : 2}
        const user= await usersCollectionObj.findOne({username:id})
        res.send({message:"Look",payload:user})
      
      })
      userApp.delete("/user",async(req,res)=>{
        await usersCollectionObj.deleteMany()
        res.send({message:"done deleted all"})
      })
    
      userApp.post("/Login",async (req, res) => {
        const newuser = req.body;
        const dbuser = await usersCollectionObj.findOne({ username: newuser.username });
        if (dbuser === null) {
            res.send({ message: "does not  exist enter correct username" });
        } else {
           
            const status = await bycryptjs.compare(newuser.password, dbuser.password);
            if (status === false) {
                res.send({ message: "Invalid password" });
            } else {
                const signedToken = jsonwebtoken.sign({ username: dbuser.username }, 'abcdef', { expiresIn: 40 });
                res.send({ message: "login success", token: signedToken });
            }
        }
    });
    userApp.get('/protected',verifyToken,(req,res)=>{
      res.send({message:"This is sensitive info"})
    })


module.exports=userApp;