import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "../../config/firebaseConfig";
import { AuthLoginParams, AuthSignupParams } from "./authTypes";

const auth = getAuth(firebaseApp);

export const authLoginAPI = async ({
  email,
  pass,
}: AuthLoginParams): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, pass);
};

export const authSignupAPI = async ({
  email,
  pass,
}: AuthSignupParams): Promise<void> => {
  await createUserWithEmailAndPassword(auth, email, pass);
};

export const authLogoutAPI = async (): Promise<void> => {
  await auth.signOut();
};
