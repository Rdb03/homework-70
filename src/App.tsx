import ToolBar from "./components/ToolBar/ToolBar";
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound/NoFound";
import Contacts from "./containers/Contacts/Contacts.tsx";
import NewContact from "./containers/NewContact/NewContact.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditContact from "./containers/EditContact/EditContact.tsx";

const App = () => {
  return (
    <>
      <header>
          <ToolBar/>
      </header>
        <main className="container">
            <Routes>
                <Route path="/" element={
                  <Contacts/>
                }/>
                <Route path="/new-contact" element={
                    <NewContact/>
                }/>
                <Route path="*" element={
                    <NotFound />
                } />
                <Route path="/edit-contact/:id" element={
                    <EditContact/>
                }/>
            </Routes>
        </main>
    </>
  );
};

export default App;
