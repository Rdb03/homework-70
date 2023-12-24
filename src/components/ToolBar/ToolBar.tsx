import {NavLink} from "react-router-dom";
import './ToolBar.css';

const ToolBar = () => {
    return (
        <div className="tool-bar">
            <div className="container d-flex justify-content-between align-items-center">
                <NavLink to="/"  className="logo">Contacts</NavLink>
                <NavLink to="/new-contact" className="add-btn">Add new contact</NavLink>
            </div>
        </div>
    );
};

export default ToolBar;