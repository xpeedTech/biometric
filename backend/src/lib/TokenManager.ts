import jwt from "jsonwebtoken";
export default class TokenManager {
    static verifyAccessToken(token: string) {
        console.log('the token is', token, 'and the string is ', process.env.ACCESS_TOKEN_KEY);
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_KEY || "");
        } catch (e) {
            return false;
        }
    }
    static verifyRefreshToken(token: string) {
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_KEY || "");
        } catch (e) {
            return false;
        }
    }
    static generateAuthTokens(user: any) {
        const accessToken = jwt.sign(
            {
                _id: user?._id,
                type: "access"
            },
            process.env.ACCESS_TOKEN_KEY || "",
            {
                expiresIn: '1d'
            }
        );


        const refreshToken = jwt.sign(
            {
                _id: user?._id,
                type: "refresh"
            },
            process.env.ACCESS_TOKEN_KEY || "",
            {
                expiresIn: '30d'
            }
        );
        return {
            accessToken, refreshToken
        }
    }
}