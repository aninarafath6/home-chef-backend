var jwt = require('jsonwebtoken')
module.exports =validUser=(req,res,next)=>{
    return new Promise((resolve,reject)=>{
        
    let authHedder = req.headers.authorazation;
    if (authHedder ==undefined) {
        console.log("token is undefined");
        res.send({loggin:false})  
        
        
        
    }
   else{
    let token =authHedder.split(' ')[1];
    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err) {
            res.send({loggin:false})  

        }else{
        resolve(decode)
//  res.send({loggin:true})  
        next();
        }
    })
   }
    })
    
};