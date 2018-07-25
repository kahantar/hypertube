const jwt = require('jsonwebtoken');

const secret = "7nTx713Jo25A4hrlWQ3hsQPPIAd0yT";

module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
            userId: userData.id            
        }, secret)
    },
    getUserId: (authorization) => {
        let userId = -1;
        console.log(authorization)
        if (authorization != null){
            try{
                const jwtToken = jwt.verify(authorization, secret);
                userId = jwtToken.userId;
                console.log(jwtToken)
            }
            catch(err){
                return -1;
            }
        }
        return userId
    }
}