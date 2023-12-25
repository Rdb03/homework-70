import ContactForm from "../../components/ContactForm/ContactForm.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {fetchOneContact, updateContact} from "../Contacts/contactsThunk.ts";
import {useEffect} from "react";
import {selectContact, selectOneFetchLoading, selectUpdateContactLoading} from "../Contacts/contactsSlice.ts";
import {ApiContact} from "../../type";
import Spinner from "../../components/Spinner/Spinner.tsx";

const EditContact = () => {
    const navigate = useNavigate();
    const {id} = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const contact = useAppSelector(selectContact);
    const fetchLoading = useAppSelector(selectOneFetchLoading);
    const updateLoading = useAppSelector(selectUpdateContactLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchOneContact(id));
        }
    }, [dispatch, id]);

    const onSubmit  = async (contact: ApiContact)   => {
      await dispatch(updateContact({id, contact}));
      navigate('/');
    };

    const existingContact = contact ? {
        ...contact,
        phone: contact.phone.toString(),
    } : undefined;

    let formSection = <Spinner/>;

    if(!fetchLoading) {
        if(contact) {
            formSection = (
                <ContactForm
                isEdit
                onSubmit={onSubmit}
                existingContact={existingContact}
                isLoading = {updateLoading}
                />
            );
        } else {
            formSection = <h4>Not Found</h4>;
        }
    }

    return (
        <div className="row mt-2">
            <div className="col">
                {formSection}
            </div>
        </div>
    );
};

export default EditContact;