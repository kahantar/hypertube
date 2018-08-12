const jwt = require('jsonwebtoken');

const secret = "7nTx713Jo25A4hrlWQ3hsQPPIAd0yT";

module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
            userId: userData            
        }, secret)
    },
    getUserId: (authorization) => {
        let userId = -1;
        if (authorization != null){
            try{
                const jwtToken = jwt.verify(authorization, secret);
                console.log(jwtToken)
                userId = jwtToken.userId;
            }
            catch(err){
                return -1;
            }
        }
        return userId
    }
}