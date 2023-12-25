import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {selectContact, selectContacts, selectDeleteContactLoading} from "./contactsSlice.ts";
import {useEffect, useState} from "react";
import {deleteContact, fetchContacts, fetchOneContact} from "./contactsThunk.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import Modal from "../../components/Modal/Modal.tsx";
import {NavLink} from "react-router-dom";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner.tsx";
import './Contacts.css';

const Contacts = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(selectContacts);
    const contact = useAppSelector(selectContact);
    const [showModal, setShowModal] = useState(false);
    const deleteLoading = useAppSelector(selectDeleteContactLoading);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleContactClick = (id: string) => {
        dispatch(fetchOneContact(id));
        setShowModal(true);
    };

    const removeContact = async (id: string) => {
        await dispatch(deleteContact(id));
        await dispatch(fetchContacts());
        setShowModal(false);
    };

    return (
        <>
            <div>
                {contacts ? (
                    contacts.map((contact) => (
                        <div onClick={() => handleContactClick(contact.id)} key={contact.id} className="contact-div mt-4">
                            {contact.photo ? (
                                <img className="contact-photo" src={contact.photo} alt={contact.name} />
                            ) : <img className="contact-photo" src="https://via.placeholder.com/300" alt="Preview" />}
                            <div className="contact-info">
                                <p>{contact.name}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <Spinner />
                )}
            </div>
            <Modal show={showModal} title="Contact Info" onClose={() => setShowModal(false)}>
                {contact ? (
                    <>
                        <div className="modal-body d-flex justify-content-between align-items-center">
                            {contact.photo ? (
                                <img className="contact-photo" src={contact.photo} alt={contact.name}/>
                            ) : <img className="contact-photo" src="https://via.placeholder.com/300" alt="Preview"/>}
                            <div className="modal-info">
                                <p>{contact.name}</p>
                                <p>{contact.phone}</p>
                                <p>{contact.email}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <NavLink className="contact-btn edit"  to={`/edit-contact/${contact.id}`}>
                              Edit
                            </NavLink>
                            <button className="contact-btn delete" onClick={() => contact && removeContact(contact.id)}>
                                {deleteLoading && deleteLoading === contact.id ? (<ButtonSpinner/>) : "Delete"}
                            </button>
                        </div>
                    </>
                ) : <div>
                    <div className="modal-body d-flex justify-content-between align-items-center">
                        <div className="modal-info">
                            <Spinner/>
                        </div>
                    </div>
                </div>}
            </Modal>
        </>
    );
};

export default Contacts;