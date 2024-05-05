
export type User = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Roles[];
    id?: number;
    token?: string;
    password?: string;
    specialties: Specialty[];
};

export type Specialty = {
    id: number;
    name: string
}

export type EditUser = {
    email: string;
    firstName: string;
    lastName: string;
    roles: Roles[];
};

export enum Roles {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_CLIENT = 'ROLE_CLIENT',
    ROLE_DOCTOR = 'ROLE_DOCTOR'
}

export type Email = {
    to: string,
    subject: string,
    message: string
}