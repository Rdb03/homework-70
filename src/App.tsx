import ToolBar from "./components/ToolBar/ToolBar";
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound/NoFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import Contacts from "./containers/Contacts/Contacts.tsx";
import NewContact from "./containers/NewContact/NewContact.tsx";

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
            </Routes>
        </main>
    </>
  );
};

export default App;
