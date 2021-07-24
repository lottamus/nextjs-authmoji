import { v4 as uuidv4 } from "uuid";

const users = [];

export async function createUser({ phoneNumber, verifyId }) {
  const createdAt = Date.now();
  const user = {
    id: uuidv4(),
    createdAt,

    phoneNumber,
    phoneNumberVerified: false,
    verifyId, // Used to look up the user later
  };

  // This is an in memory store for users, there is no data persistence without a proper DB
  users.push(user);

  return { phoneNumber, createdAt };
}

export async function verifyPhoneNumber({ verifyId, phoneNumber }) {
  // Look up user by the verifyId
  const user = users.find(
    (user) => user.verifyId === verifyId && user.phoneNumber === phoneNumber
  );

  if (user) {
    // Set their phone number as verified
    user.phoneNumberVerified = true;
    user.verifyId = null;
  }

  return user;
}
