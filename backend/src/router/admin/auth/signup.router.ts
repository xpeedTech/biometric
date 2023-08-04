import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../../../models/schemas/User";
import TokenManager from "../../../lib/TokenManager";

const router = Router({ mergeParams: true });

router.post("/", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const userCheck = await User.findOne({ $or: [
        {username: username },
        {email: email },
    ]});

    if (userCheck) return res.status(400).json({
        resultCode: "DUPLICATE_USER",
        message: "Another account already exist with same email or username"
    })


    const user = new User({
        name,
        email,
        username,
        password: bcrypt.hashSync(password, 10),

    });

    await user.save();
   

    const  {accessToken, refreshToken} =  await TokenManager.generateAuthTokens(user);

    return res.json({
        resultCode: "SUCCESS",
        message: "Successful",
        result: {
            accessToken,
            refreshToken
        }
    })


})



export default router;
