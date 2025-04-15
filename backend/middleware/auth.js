import jwt from "jsonwebtoken";
import {
    toast
} from 'react-toastify';

const authUser = async (req, res, next) => {
    const token = req.headers.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authorization token missing",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload",
            });
        }

        const userId = Number(decoded.id);

        if (isNaN(userId)) {
            return res.status(401).json({
                success: false,
                message: "Invalid user ID format",
            });
        }

        req.userId = userId;
        next();
    } catch (error) {
        toast.error(`Authentication error: ${error.message}`);
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authUser;
