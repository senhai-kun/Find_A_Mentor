import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages/index";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import GlobalListener from "./utils/GlobalListener";
import ScrollToTop from "./utils/ScrollToTop";

// notes
// add href to helmet
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
