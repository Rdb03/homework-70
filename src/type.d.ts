export interface IApiContacts {
    name: string;
    id: string;
    photo: string;
    phone: number;
    email: string;
}

export type ApiContact = Omit<IApiContacts, 'id'>;

export interface IContactMutation {
    photo: string;
    phone: string;
    email: string;
    name: string;
}

export interface IApiContactsList {
    [key: string]: IApiContacts;
}
