const jwt = require("jsonwebtoken")

function authentication (req: any, resp: any, next: any) {
    // check if the header contains token

    if(!req.header['Authorizaton']) {
        return resp.status(401).json({
            status: false,
            message: "Un Authorized",
        });
    }

    const token = req.header['Authorizaton'].split(" ")[1];
    const decodedUser = jwt.verify(token, "MY_ACCESS_TOKEN");
    req.user = decodedUser;

    next();
}


module.exports = authentication;