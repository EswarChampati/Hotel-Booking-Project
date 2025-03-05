export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserResponse = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  __v: number;
};
