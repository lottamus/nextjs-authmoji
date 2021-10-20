import { createUser } from "../../lib/user";

export default async function signup(req, res) {
  try {
    const response = await fetch(`${process.env.AUTHMOJI_URL}/api/sequences`, {
      method: "post",
      headers: {
        authorization: process.env.AUTHMOJI_SECRET,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tel: req.body.phoneNumber,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const { sequence_id: verifyId } = data;

      await createUser({ ...req.body, verifyId });

      res.status(200).send({
        done: true,
        verifyUrl: `${process.env.AUTHMOJI_URL}/verify/${verifyId}`,
      });
    } else {
      res.status(400).end(data.message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
