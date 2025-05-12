export class User {
  uuid: string = '';
  status: number = 0;
  dateCreated: string = '';
  username: string | null = null;
  nombre: string | null = null;
  active: number = 0;
  email: string | null = null;
  sector: string | null = null;
  password: string | null = null;
  resetPassword: number = 0;
  permisos: string[] = [];
}
