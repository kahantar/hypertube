const jwt = require('jsonwebtoken');

const secret = "7nTx713Jo25A4hrlWQ3hsQPPIAd0yT";

module.exports = {
    generateTokenForId: (id) => {
        return jwt.sign({
            userId: id            
        }, secret)
    },
    getUserId: (authorization) => {
        let userId = -1;
        if (authorization != null){
            try{
                const jwtToken = jwt.verify(authorization, secret);
                userId = jwtToken.userId;
            }
            catch(err){
                return -1;
            }
        }
        return userId
    },
    generateTokenForUser: (userData) => {
        return jwt.sign({
            name: userData.name,
            first_name: userData.first_name,
            username: userData.username,
            email: userData.email,
            img: userData.img
        }, secret)
    }
}