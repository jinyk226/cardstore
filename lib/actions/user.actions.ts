"use server";

import { signInFormSchema, signUpFormSchema } from "../validators";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  signIn,
} from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";

export const signInWithCredentials = async (
  _prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; message: string }> => {
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

export const signOut = async (): Promise<void> => {
  await nextAuthSignOut();
};

export const signUpUser = async (prevState: unknown, formData: FormData) => {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashSync(user.password, 10), //! WARNING: ENSURE ALL CREATED USERS HAVE HASHED PASSWORDS
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: user.password,
    });

    return { success: true, message: "User registered successfully!" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "User was not registered!" };
  }
};
