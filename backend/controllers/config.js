const jwt = require("jsonwebtoken");


const genrateToken=(payload,options)=>{
const token = jwt.sign(payload, process.env.SECRET, options);

 
  return( token)
}

module.exports={genrateToken}