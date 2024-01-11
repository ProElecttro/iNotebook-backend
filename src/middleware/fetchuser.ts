import jwt, { JwtPayload } from "jsonwebtoken";

const fetchuser = async (req: any, res: any, next: any) => {
    const jwt_secret = process.env.JWT_SECRET!;
    const token = req.headers['auth-token'];

    if (!token) {
        return res.status(401).json({ error: "user is not authenticated" });
    }

    try {
        const payload: JwtPayload = jwt.verify(token, jwt_secret) as JwtPayload;
        req.user = payload.user;
        next();
    } catch (error) {
        res.status(500).json({ error: "some error occurred" });
    }
};

export default fetchuser;
