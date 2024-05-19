const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
require('./DB/DBconfig')
const User=require('./DB/DBschema')
const Product=require('./DB/Product')
const Jwt=require('jsonwebtoken');
const jwtKey='e-comm';
const app=express();

app.use(express.json())
app.use(cors());
app.post('/signup',async(req,resp)=>{
    let user=new User(req.body)
   let result=  await user.save();
   result=result.toObject();
   delete result.password;
   Jwt.sign({result},jwtKey,{expiresIn:'7h'},(err,token)=>{
    if(err)
    {
        resp.send({result:'Something went wrong'})
    }
    resp.send({result, auth:token})
})

})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        
        let user = await User.findOne(req.body).select("-password");
    
        if(user)
        {
            Jwt.sign({user},jwtKey,{expiresIn:'7h'},(err,token)=>{
                if(err)
                {
                    resp.send({result:'Something went wrong'})
                }
                resp.send({user,auth:token})
            })
            
        }
        else{
            resp.send({result:'No user f'})
        }
    }
    else{
        resp.send({result:'No user'})
    }
});

app.post('/add-product',verifytoken,async(req,resp)=>{
    const userId = req.userId;

    // Create a new product instance with the request body
    let product = new Product(req.body);

    // Associate the product with the authenticated user by setting the user_id field
    product._id = userId;

    // Save the product to the database
    let result = await product.save();
    resp.send(result)
})

app.get("/products",verifytoken, async(req,resp)=>{
    const userId = req.userId;
       console.log(userId)
    // Find products associated with the authenticated user
    let products = await Product.find(userId);
    
    if(products.length>0 && products)
    {
        resp.send(products)
    }
    else{
        resp.send({result:"No product found"})
    }
})

app.delete("/product/:id",async(req,resp)=>{

    let result=await Product.deleteOne({_id:req.params.id})
    resp.send(result)
})
app.get("/product/:id",verifytoken, async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ "result": "No Record Found." })
    }
})

app.put("/product/:id",verifytoken, async (req, resp) => {
let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
)
resp.send(result)
});

app.put("/product/:id",verifytoken, async (req, resp) => {
let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
)
resp.send(result)
});

app.get("/search/:key",verifytoken, async (req, resp) => {
let result = await Product.find({
    "$or": [
        {
            name: { $regex: req.params.key }  
        },
        {
            company: { $regex: req.params.key }
        },
        {
            category: { $regex: req.params.key }
        }
    ]
});
resp.send(result);
})

function verifytoken(req,resp,next)
{
    let token=req.headers['authorization'];
    if(token)
    {
        token=token.split(' ')[1];
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err)
            {
                resp.status(401).send({result:"please provide valid token"})
            }
            else{
                next();
            }
        })
    }
    else{
        resp.status(403).send({result:"please add the token in headrs"})
    }
    
}



const PORT=8000
app.listen(PORT)