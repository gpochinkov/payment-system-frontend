import './App.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import Merchants from './components/Merchants';

function App() {
  return (
    <Container>    
      <div id="title">Admin Panel</div>
      <Tabs
        defaultActiveKey="merchants"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="merchants" title="Merchants">
          <Merchants />
        </Tab>
        <Tab eventKey="transactions" title="Transactions">
          <span>asdsad</span>
          <span>asd232sad</span>
          <span>asdssdsad</span>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
