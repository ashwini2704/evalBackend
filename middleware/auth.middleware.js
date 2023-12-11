
const jwt = require("jsonwebtoken");
const { BlackModel } = require("../model/blacklist.model");

const auth = async(req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]
    try {
        const blacklistedToken = await BlackModel.findOne({token});
        if(blacklistedToken) {
            res.status(200).send({"msg" : "Please login again"})
        }else{
            jwt.verify(token, 'masai', async(err, decoded) => {
                if(err) {
                    res.status(200).send({"msg" : "Not authorised"})
                }else{
                    req.body.userID = decoded.userID;
                    next()
                }
              });
        }
    } catch (error) {
        res.status(400).send({"Error" : error})
    }
}

module.exports = {
    auth
}