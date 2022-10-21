import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages/index";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import GlobalListener from "./globals/GlobalListener";
import ScrollToTop from "./globals/ScrollToTop";
import axios from "axios";

// notes
// add href to helmet (DONE)
// clear logs

function App() {

    return (
        <React.Fragment>
            <Provider store={store}>
                <Router>
                    <GlobalListener />
                    <ScrollToTop />
                    <Pages />
                </Router>
            </Provider>
        </React.Fragment>
    );
}

export default App;
