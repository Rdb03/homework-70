import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {ApiContact, IApiContacts, IApiContactsList} from "../../type";

export const fetchContacts = createAsyncThunk<IApiContacts[]>(
    'contacts/fetch',
    async () => {
        const response = await axiosApi.get<IApiContactsList | null>('contacts.json');
        const contactsResponse = response.data;
        let contacts: IApiContacts[] = [];

        if (contactsResponse) {
            contacts = Object.keys(contactsResponse).map((id) =>({
                ...contactsResponse[id],
                id
            }));
        }

        return contacts;
    });

export const createContact = createAsyncThunk<void, ApiContact>(
    'contacts/create',
    async (contact) =>{
        await axiosApi.post('/contacts.json', contact);
    }
);

export const fetchOneContact = createAsyncThunk<IApiContacts, string>(
    'contacts/fetchOne',
    async (id) => {
        const response = await axiosApi.get<IApiContacts>(`/contacts/${id}.json`);
        const data: IApiContacts = response.data;
        return {
            name: data.name,
            phone: data.phone,
            photo: data.photo,
            email: data.email,
            id: id,
        };
    }
);

export const deleteContact = createAsyncThunk<void, string>(
    'contact/delete',
    async (contactID) => {
        await axiosApi.delete(`/contacts/${contactID}.json`);
    }
);

interface UpdateContactParams {
    id: string,
    contact: ApiContact,
}

export const updateContact = createAsyncThunk<void, UpdateContactParams>(
    'contact/update',
    async ({id, contact}) => {
         await axiosApi.put(`/contacts/${id}.json`, contact);
    }
);