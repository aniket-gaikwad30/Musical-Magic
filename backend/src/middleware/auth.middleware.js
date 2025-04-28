import { clerkClient} from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId){
         res.status(401).json({ message: "Unauthorized- You are not logged in" });
         return
    }else{
        next();
    }
}



export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
       const isAdmin = process.env.ADMIN_EMAILS === currentUser.primaryEmailAddress?.emailAddress;

        if(!isAdmin){
            res.status(401).json({ message: "Unauthorized- You are not an admin" });
            return
        }
        next();
    } catch (error) {
        next(error)
    }
}