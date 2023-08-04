
import { NextFunction } from "express";
import JWT from "jsonwebtoken";

export default (options: { role: string, platform: string }) => async function AuthMiddleware(req: any, res: any, next: NextFunction) {
    const accessToken = (req.headers.authorization || req.headers.Authorization).replace("Bearer ", "");
    console.log("The token is", accessToken);
    if (!accessToken) return res.status(401).json({
        resultCode: "TOKEN_MISSING",
        message: "Access token is required",
    })
    try {
        console.log("Validating token");
        const payload = await JWT.verify(accessToken, process.env.ACCESS_TOKEN_KEY ||"")
        if(options.role != options.role) return res.status(403).json({
            resultCode: "INVALID_ROLE",
            message: "Forbidden"
        })
        req.auth = payload;
        next();
    } catch (err) {
        return res.status(401).json({
            resultCode: "INVALID_ACCESS_TOKEN",
            message: "Invalid access token",
        })
    }
}