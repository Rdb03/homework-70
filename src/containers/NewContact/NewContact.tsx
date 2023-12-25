import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {selectCreateContactLoading} from "../Contacts/contactsSlice.ts";
import {createContact, fetchContacts} from "../Contacts/contactsThunk.ts";
import ContactForm from "../../components/ContactForm/ContactForm.tsx";
import {ApiContact} from "../../type";

const NewContact = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const createLoading = useAppSelector(selectCreateContactLoading);

    const onSubmit = (contact: ApiContact) => {
        dispatch(createContact(contact));
        dispatch(fetchContacts());
        navigate('/');
    };

    return (
        <div className="row mt-2">
            <div className="col">
                <ContactForm onSubmit={onSubmit} isLoading={createLoading}/>
            </div>
        </div>
    );
};

export default NewContact;