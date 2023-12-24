import {ApiContact, IContactMutation} from "../../type";
import React, {useState} from "react";
import ButtonSpinner from "../Spinner/ButtonSpinner.tsx";
import './ContactForm.css';

const initialState: IContactMutation = {
    name: '',
    photo: '',
    email: '',
    phone: '',
};

interface Props {
    onSubmit: (contact: ApiContact) => void;
    existingContact?: IContactMutation;
    isEdit?: boolean;
    isLoading?: boolean;
}

const ContactForm: React.FC<Props> = ({onSubmit, existingContact = initialState, isEdit = false, isLoading = false}) => {
    const [contact, setContact] = useState(existingContact);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const changeContact = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'photo') {
            setContact((prev) => ({
                ...prev,
                [name]: value,
            }));
            setImagePreview(value);
        } else {
            setContact((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;

        onSubmit({
            ...contact,
            phone: parseInt(contact.phone),
        });
    };

    return (
        <form onSubmit={onFormSubmit}>
            <h4>{isEdit ? 'Edit Contact' : 'Add new Contact'}</h4>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={contact.name}
                    onChange={changeContact}
                    required
                />
                <label htmlFor="phone">Phone:</label>
                <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="form-control"
                    value={contact.phone}
                    onChange={changeContact}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    value={contact.email}
                    onChange={changeContact}
                    required
                />
                <label htmlFor="photo">Photo:</label>
                <input
                    type="url"
                    name="photo"
                    id="photo"
                    className="form-control"
                    value={contact.photo}
                    onChange={changeContact}
                    required
                />
                {imagePreview ? (
                    <div className="image-preview">
                        <img className="contact-image" src={imagePreview} alt="Not Found"/>
                    </div>
                ) : <div className="image-preview">
                    <img className="contact-image" src="https://via.placeholder.com/300" alt="Preview"/>
                </div>}
            </div>

            <button type="submit" className="btn btn-danger mt-2" disabled={isLoading}>
            {isLoading && <ButtonSpinner />}
                {isEdit ? 'Update' : 'Create'}
            </button>
        </form>
    );
};

export default ContactForm;
