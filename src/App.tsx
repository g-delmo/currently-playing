import { BrowserRouter as Router, Route } from "react-router-dom";
import CustomizePage from "./CustomizePage";
import Widget from "./Widget";

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
