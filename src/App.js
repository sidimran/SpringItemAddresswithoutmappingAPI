import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddItems from "./components/AddItems";
import Header from "./components/Header";
import ListItems from "./components/ListItem";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact component={ListItems}></Route>
          <Route path= "/list-item" component={ListItems}></Route>
          <Route path="/add-items" component={AddItems}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
