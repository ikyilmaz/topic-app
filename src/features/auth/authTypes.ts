export interface AuthState {
  user: any | null;
  loginStatus: "idle" | "loading" | "failed";
  loginError: string | null;
  signupStatus: "idle" | "loading" | "failed";
  signupError: string | null;
}

// TODO! TopicUser tipi uygulanacak...
export type TopicUser = {
  email: string;
};

export type AuthLoginParams = {
  email: string;
  pass: string;
};

export type AuthSignupParams = {
  email: string;
  pass: string;
};
