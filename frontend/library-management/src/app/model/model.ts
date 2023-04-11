export class Signup {

  firstname!: string;
  lastname!: string;
  // dateofbirth!: Date
  email!: string;
  mobilenumber!: string;
  password!: string;
}

export class Login {
  email!: string;
  password!: string;
}

export enum Role {
  ADMIN,
  USER,
}

export class User {
  id!: number;
  firstname!: string;
  email!: string;
  role!: Role;
  blocked!:boolean;
  enabled!:boolean;
}

export interface SideNavItems {
  title: string;
  link: string;
}

export class Books {
  id!: number;
  title!: string;
  categoryId!: number;
  categoryName!: string;
  subcategory!: string;
  price!: number;
  available!: boolean;
  ordered!: boolean;
  count!: number;
  author!: string;
}

export class CategoryBooks {
  categoryName!: string;
  subcategory!: string;
  books!: Books[];
}

export class Order {
  id!: number;
  userId!: number;
  name!: string;
  bookId!: number;
  bookName!: string;
  oderedOn!: string;
  returned!: boolean;
}

export class OrderRequest {
  userId!: number;
  bookId!: number;
}

export class Users {
  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  mobilenumber!: string;
  locked!: boolean;
  enabled!: boolean;
  fine!: number;
  role!: Role;
  createdOn!: string;
}

export class BooksRequest {
  title!:string;
  categoryId!:number;
  price!:number;
  author!:string;
}

export class Category {
  name!:string;
  subcategory!:string;
}


export class Categories {
  id!:number;
  name!:string;
  subcategory!:string;
  books!:any[];
}
