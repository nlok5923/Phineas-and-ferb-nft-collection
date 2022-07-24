import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Create from './Pages/Dashboard/Create/Create';
import ContractProvider from './Provider/contractProvider'
import Listings from './Pages/Dashboard/Listings/Listings';
import Update from './Pages/Dashboard/Update/Update';

const App = () => {
  return (
    <div>
      <ContractProvider>
        <Router>
        <Navbar />
          <Switch>
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/dashboard/create" component = {Create} />
            <Route exact path="/dashboard/listing" component = {Listings} />
            <Route exact path="/dashboard/listing/:nftId" component = {Update} />
          </Switch>
        </Router>
      </ContractProvider>
    </div>
  );
}

export default App;
