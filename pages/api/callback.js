import jwt from "jsonwebtoken";
import { verifyPhoneNumber } from "../../lib/user";

export default async function callback(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send({ message: "Method not allowed" });
  }

  try {
    console.log("Verifying Authmoji token");
    // Verify the JWT to make sure it's coming from Authmoji
    const {
      approved,
      verifyId,
      tel: phoneNumber,
    } = jwt.verify(req.query.code, process.env.AUTHMOJI_SECRET, {
      issuer: process.env.AUTHMOJI_URL,
      audience: process.env.AUTHMOJI_ID,
    });

    console.log("Verifying Authmoji token", {
      approved,
      verifyId,
      phoneNumber,
    });

    if (approved) {
      // Update user or do some action
      const user = verifyPhoneNumber({ verifyId, phoneNumber });
      console.log("User is verified", user);
    }
  } catch (error) {
    // Handle error
    console.error(error);
  }

  res.redirect(302, "/success");
}
