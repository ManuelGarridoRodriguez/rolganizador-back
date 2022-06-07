export interface UserRegisterDTO {
  userName: string;
  userEmail: string;
  userNick: string;
  userPassword: string;
  userImage: string;
  createdDate: Date;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  nick: string;
  password: string;
  image: string;
  createdDate: Date;
}

export interface UserLoginDTO {
  password: string;
  email: string;
}
