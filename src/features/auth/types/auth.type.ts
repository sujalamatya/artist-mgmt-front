export interface IUser {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  role: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}
