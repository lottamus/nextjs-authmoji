import jwt from "jsonwebtoken";
import { verifyPhoneNumber } from "../../lib/user";

export default async function callback(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send({ message: "Method not allowed" });
  }

  let verifiedSequence;

  try {
    console.log("Verifying Authmoji code");
    // Verify the JWT to make sure it's coming from Authmoji
    verifiedSequence = jwt.verify(req.query.code, process.env.AUTHMOJI_SECRET, {
      issuer: process.env.AUTHMOJI_URL,
      audience: process.env.AUTHMOJI_ID,
    });

    console.log("Verified Authmoji code", verifiedSequence);
  } catch (error) {
    // Handle error
    console.error(error);
  }

  if (verifiedSequence?.status === "COMPLETED") {
    // Update user or do some action
    const user = await verifyPhoneNumber({
      verifyId: verifiedSequence.sequence_id,
      phoneNumber: verifiedSequence.tel,
    });
    console.log("User is verified", user);

    res.redirect(302, "/success");
  } else {
    res.redirect(302, "/failed");
  }
}
