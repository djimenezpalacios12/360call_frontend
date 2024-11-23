import client from "./index.api";
import { SigninBody } from "../interfaces/auth.interfaces";

export const signIn = (signinBody: SigninBody) => {
  return client.post("auth", signinBody);
};

export const metadataUser = () => {
  return client.post("auth/metadata");
};
