import './Contacts.css';
import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {selectContact} from "./contactsSlice.ts";
import {useEffect, useState} from "react";
import {fetchContacts} from "./contactsThunk.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import Modal from "../../components/Modal/Modal.tsx";

const Contacts = () => {
    const [modalActive, setModalActive] = useState(false);
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(selectContact);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <>
            <Modal active={modalActive} setActive={setModalActive}/>
            <div>
                {contacts ? (
                    contacts.map((contact) => (
                        <div onClick={() => setModalActive(true)} key={contact.id} className="contact-div mt-4">
                            <img className="contact-photo" src={contact.photo} alt={contact.name}/>
                            <div className="contact-info">
                                <p>{contact.name}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <Spinner/>
                )}
            </div>
        </>
    );
};

export default Contacts;