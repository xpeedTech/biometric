import { Router } from "express";
import User from "../../../models/schemas/User";
import TokenManager from "../../../lib/TokenManager";
const router = Router({ mergeParams: true });
export const options = {
    isSeure: true, 
    role: "admin"
}
router.post("/", async (req: any, res) => {
    const rToken = req.body.refreshToken;

    const payload: any = TokenManager.verifyRefreshToken(rToken);
    if (!payload) return res.status(401).json({
        resultCode: "INVALID_REFRESH_TOKEN",
        message: "Invalid refresh token"
    })

    const user = await User.findOne({ _id: payload._id });
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
