import { signInFormSchema } from "../validators";
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const signInWithCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await nextAuthSignIn("credentials", user);

    return { success: true, message: "Signed in successfully!" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password!" };
  }
};

export const signOut = async () => {
  await nextAuthSignOut();
};
