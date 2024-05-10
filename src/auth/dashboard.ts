const User = require("../schema/userSchema");

async function dashboard(req: any, resp: any) {

    // first validate user input before proceeding
    // check if user already exists
    
    const userExists = await User.findOne({email: req?.body?.email});

    if(!userExists) {
        return resp.status(400).json({
            message: "User Was not found!"
        });
    }

    return resp.json({
        status: true,
        user: userExists,
    });

}

module.exports = dashboard