const UserModel = require("../schema/userSchema");
const bcrypt = require("bcryptjs")
const jwtWeb = require("jsonwebtoken")
const  { Validator } = require('node-input-validator');

async function registeration(req: any, resp: any) {

    // first validate user input before proceeding
    // check if user already exists

    const validate = new Validator(req.body, {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        password: 'required|string',
    });

    // Vaidate inpputs
    const matched = await validate.check();
    // Vaidate checkpoint
    if(!matched) {
        return resp.status(422).json({ status: false, message: validate.errors });
    }

    const userExists = await UserModel.findOne({email: req?.body?.email})

    if(userExists) {
        return resp.status(400).json({
            message: "User Already ecists!"
        });
    }

    // encryp the user password

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(req.body?.password, salt);

    const user = await UserModel.create({
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        password: hash,
        email: req?.body?.email,
    });

    const payload = {_id: user?._id};

    const token = jwtWeb.sign(
        payload, 
        "MY_ACCESS_TOKEN",
        {expiresIn: "1d"}
    );

    return resp.json({
        status: true,
        data: user,
        token: token 
    });

}

module.exports = registeration