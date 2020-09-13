import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {UserSessionProvider} from "./context/UserSession";
import Main from "./components/Main";

function App() {
    return (
        <div className="App">
            <Router>
                <UserSessionProvider>
                    <Main/>
                </UserSessionProvider>
            </Router>
        </div>
    );
}

export default App;
