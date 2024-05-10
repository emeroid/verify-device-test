const jwt = require("jsonwebtoken");

function authentication(req: any, resp: any, next: any) {
    // Check if the header contains a token
    if (!req.headers['authorization']) {
        return resp.status(401).json({
            status: false,
            message: "Unauthorized",
        });
    }

    const token = req.headers['authorization'].split(" ")[1];

    try {
        // Verify the token
        const decodedUser = jwt.verify(token, "MY_ACCESS_TOKEN");
        req.user = decodedUser;
        next();
    } catch (error) {
        return resp.status(401).json({
            status: false,
            message: "Unauthorized",
        });
    }
}

module.exports = authentication;
