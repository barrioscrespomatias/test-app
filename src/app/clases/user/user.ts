export interface User {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  roles?: Roles
}

export interface Roles {
    profesional?:boolean,
    paciente?:boolean,
    administrador?:boolean
}
