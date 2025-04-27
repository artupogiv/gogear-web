export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type RegisterUser = Pick<User, "fullName" | "email" | "password">;
export type LoginUser = Pick<User, "email" | "password">;
