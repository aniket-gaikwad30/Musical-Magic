import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    res.status(401).json({ message: "Unauthorized - You are not logged in" });
    return;
  } else {
    next();
  }
};

export const requireAdmin = async (req, res, next) => {
  try {
    console.log("I M HERE");
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const userEmail = currentUser.primaryEmailAddress?.emailAddress;
    const adminEmail = process.env.ADMIN_EMAIL;

    console.log("User Email:", userEmail);
    console.log("Admin Email:", adminEmail);

    console.log("Auth User ID:", req.auth.userId);
    console.log(
      "Primary Email:",
      currentUser.primaryEmailAddress?.emailAddress
    );
    console.log("Expected Admin Email:", process.env.ADMIN_EMAIL);


    if (userEmail !== adminEmail) {
      return res
        .status(401)
        .json({ message: "Unauthorized - You are not an admin" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
