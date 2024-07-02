export class Usuario {
  _id?: string; // Opcional
  name: string;
  surname: string;
  username: string;
  email: string;
  phone: number;
  password: string;
  roles: string[];

  constructor(
    name: string,
    surname: string,
    username: string,
    email: string,
    phone: number,
    password: string,
    roles: string[]
  ) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.roles = roles || [];
  }
}