import { Webhook } from "svix";
import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
	try {
		const payload = req.rawBody;
		const headers = req.headers;

		const wh = new Webhook(process.env.WEBHOOK_SECRET);
		let msg;
		try {
			msg = wh.verify(payload, headers);
		} catch (err) {
			return res.status(400).json({});
		}

		const { id, first_name, last_name, image_url } = msg.data;

		// check if user already exists
		const user = await User.findOne({ clerkId: id });

		if (!user) {
			// signup
			await User.create({
				clerkId: id,
				fullName: `${first_name || ""} ${last_name || ""}`.trim(),
				imageUrl: image_url,
			});
		}

		res.status(200).json({ success: true });
	} catch (error) {
		console.log("Error in auth callback", error);
		next(error);
	}
};

export const syncUser = async (req, res, next) => {
	try {
		const { id, first_name, last_name, image_url } = req.body;

		const user = await User.findOneAndUpdate(
			{ clerkId: id },
			{
				fullName: `${first_name || ""} ${last_name || ""}`.trim(),
				imageUrl: image_url,
			},
			{ upsert: true, new: true }
		);

		res.json(user);
	} catch (error) {
		console.log("Error in sync user", error);
		next(error);
	}
};
