export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
}

export interface IArtist {
  id?: number;
  name: string;
  dob: string;
  address: string;
  gender: string;
  first_release_year: number;
  no_of_albums: number;
}

export interface IUser {
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

export interface IAPIResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}
