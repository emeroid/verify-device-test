const User = require("../schema/userSchema");

async function dashboard(req: any, resp: any) {

    // Display user profile details from the request header
    const userExists = await User.findOne({_id: req?.user?._id});

    if(!userExists) {
        return resp.status(401).json({
            message: "Unauthorized!"
        });
    }

    return resp.json({
        status: true,
        user: userExists,
    });

}

module.exports = dashboard