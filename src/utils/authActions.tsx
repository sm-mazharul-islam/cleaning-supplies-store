import { auth, googleProvider } from "@/lib/Firebase";
import { signInWithPopup } from "firebase/auth";

export const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userData = {
      uid: user.uid,
      userName: user.displayName,
      email: user.email,
      pictureUrl: user.photoURL,
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return user;
  } catch (error) {
    console.error("Login & Backend Sync Error:", error);
    throw error;
  }
};
