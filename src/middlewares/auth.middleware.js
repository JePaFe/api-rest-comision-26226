import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    const prefix = "Bearer ";

    if (!authHeader || !authHeader.startsWith(prefix)) {
        return res.status(401).send("Unauthorized");
    }

    const token = authHeader.slice(prefix.length);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
}