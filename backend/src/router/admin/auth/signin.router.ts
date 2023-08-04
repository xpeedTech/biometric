import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../../../models/schemas/User";
import TokenManager from "../../../lib/TokenManager";

const router = Router({ mergeParams: true });

router.post("/", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username: username });

    if (!user) return res.status(400).json({
        resultCode: "INVALID_CREDENTIAL",
        message: "Please enter correct username or password"
    })

    if (!bcrypt.compareSync(password, user.password)) return res.status(400).json({
        resultCode: "INVALID_CREDENTIAL",
        message: "Please enter correct username or password"
    })

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
