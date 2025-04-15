import jwt from 'jsonwebtoken';
import {
    toast
} from 'react-toastify';

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ?
            authHeader.split(' ')[1] :
            req.headers.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Admin privileges required"
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        toast.error(`Admin auth error: ${error.message}`);
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default adminAuth;
