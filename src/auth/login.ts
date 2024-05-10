const UserData = require("../schema/userSchema");
const bcryptHash = require("bcryptjs");
const jwtToken = require("jsonwebtoken")
const  Validators = require('node-input-validator');

async function login(req: any, resp: any) {

    // first validate user input before proceeding
    const validate = new Validators.Validator(req.body, {
        email: 'required|email',
        password: 'required|string',
    });

    // Vaidate inpputs
    const matched = await validate.check();
    // Vaidate checkpoint
    if(!matched) {
        return resp.status(422).json({ status: false, message: validate.errors });
    }

    const userExists = await UserData.findOne({email: req?.body?.email});

    if(!userExists) {
        return resp.status(400).json({
            message: "User Was not found!"
        });
    }

    const password = await bcryptHash.compareSync(req?.body?.password, userExists?.password);
    if(!password) {
        return resp.status(400).json({
            message: "Invalid User name or password"
        });
    }

    const payload = {_id: userExists?._id};

    const token = jwtToken.sign(
        payload, 
        "MY_ACCESS_TOKEN",
        {expiresIn: "1d"}
    );

    return resp.json({
        status: true,
        user: userExists,
        token
    });

}

module.exports = login