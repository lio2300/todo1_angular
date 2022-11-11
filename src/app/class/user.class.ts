export class User {
  pk_user: number;
  user_name: string;
  user_firstname: string;
  user_lastname: string;
  user_email: string;
  user_phone: string;
  user_dni: string;
  user_age: number;
  user_createdAt: string;
  user_status: boolean;

  constructor(user: any) {
    this.pk_user = user?.pk_user ?? 0;
    this.user_name = user?.user_name ?? '';
    this.user_firstname = user?.user_firstname ?? '';
    this.user_lastname = user?.user_lastname ?? '';
    this.user_email = user?.user_email ?? '';
    this.user_phone = user?.user_phone ?? '';
    this.user_dni = user?.user_dni ?? '';
    this.user_age = user?.user_age ?? 0;
    this.user_createdAt = user?.user_createdAt ?? new Date().toISOString();
    this.user_status = user?.user_status ?? true;
  }
}
