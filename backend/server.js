const exp=require('express')
const app=exp()
let user=[
    {
        id:'1',
        username:'kiran'
    },
    {
        id:'2',
        username:'kiran'
    }
]

app.listen(4000,()=>console.log("welcome back..."))
app.get('/user/:id',(req,res)=>{
    let resa=req.params
    let resa1=resa.id
    console.log(resa,resa1)
    user.find((userobj)=>{
        if (userobj.id===resa1){
             res.send({payload:userobj
            })
        }

    })
})
app.get('/user',(req,res)=>{
    
   res.send({message:"Users",payload:user}) 

   
})