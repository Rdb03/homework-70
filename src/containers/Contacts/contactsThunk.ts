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