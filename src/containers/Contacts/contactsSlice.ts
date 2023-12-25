import {createSlice} from "@reduxjs/toolkit";
import {createContact, deleteContact, fetchContacts, fetchOneContact, updateContact} from "./contactsThunk";
import {RootState} from "../../app/store.ts";
import {IApiContacts} from "../../type";

interface ContactsState {
    contacts: IApiContacts[] | null;
    contact: IApiContacts | null;
    fetchLoading: boolean;
    createContact: boolean;
    deleteLoading: boolean | string;
    updateLoading: boolean;
    fetchOneLoading: boolean;
}

const initialState: ContactsState = {
    contacts: null,
    contact: null,
    fetchLoading: false,
    createContact: false,
    deleteLoading: false,
    updateLoading: false,
    fetchOneLoading: false,
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
        builder.addCase(fetchOneContact.pending, (state)=> {
            state.fetchOneLoading = true;
        });
        builder.addCase(fetchOneContact.fulfilled, (state, action) => {
            state.contact = action.payload;
            state.fetchOneLoading = false;
        });
        builder.addCase(fetchOneContact.rejected, (state) => {
            state.fetchOneLoading = false;
        });
        builder.addCase(deleteContact.pending, (state, {meta}) => {
            state.deleteLoading = meta.arg;
        });
        builder.addCase(deleteContact.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteContact.rejected, (state) => {
            state.deleteLoading = false;
            state.fetchLoading = false;
        });
        builder.addCase(updateContact.pending, (state) => {
            state.updateLoading = true;
        });
        builder.addCase(updateContact.fulfilled, (state) => {
            state.updateLoading = false;
        });
        builder.addCase(updateContact.rejected, (state) => {
            state.updateLoading = false;
        });
    }
});


export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectContact = (state: RootState) => state.contacts.contact;
export const selectCreateContactLoading = (state: RootState) => state.contacts.createContact;
export const selectDeleteContactLoading = (state: RootState) => state.contacts.deleteLoading;
export const selectUpdateContactLoading = (state: RootState) => state.contacts.updateLoading;

export const selectOneFetchLoading = (state: RootState) => state.contacts.fetchOneLoading;
export const contactsReducer = contactsSlice.reducer;

