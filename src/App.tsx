import { BrowserRouter as Router, Route } from "react-router-dom";

/* Import routes */
import CustomizePage from "./views/index";
import Widget from "./views/widget";

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={CustomizePage} />
        <Route exact path="/widget" component={Widget} />
      </Router>
    </>
  );
};

export default App;
