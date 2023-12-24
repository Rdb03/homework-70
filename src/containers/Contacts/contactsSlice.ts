import {IApiContacts} from "../../type";
import {createSlice} from "@reduxjs/toolkit";
import {createContact, fetchContacts} from "./contactsThunk";
import {RootState} from "../../app/store.ts";

interface ContactsState {
    contacts: IApiContacts[] | null;
    fetchLoading: boolean;
    createContact: boolean;
}

const initialState: ContactsState = {
    contacts: null,
    fetchLoading: false,
    createContact: false,
};

export const contactsSlice = createSlice({
    name : 'contacts',
    initialState,
    reducers: {},
    extraReducers:(builder ) => {
        builder.addCase(fetchContacts.pending, (state) => {
           state.fetchLoading = true;
        });
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state.contacts = action.payload;
            state.fetchLoading = false;
        });
        builder.addCase(fetchContacts.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createContact.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(createContact.fulfilled, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createContact.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
});


export const selectContact = (state: RootState) => state.contacts.contacts;
export const selectCreateContactLoading = (state: RootState) => state.contacts.createContact;
export const contactsReducer = contactsSlice.reducer;

