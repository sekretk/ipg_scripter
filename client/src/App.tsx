import './App.css';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { Users } from './components/users';
import { Groups } from './components/groups';
import { MainToolBar } from './components/mainbar';
import { useEffect } from 'react';
import axios from 'axios';
import { Snapshot } from './abstract';
import { isLoadingProperty, snapshot } from './store';
import { Veil } from './components/veil';
import { useProperty } from '@frp-ts/react';

function App() {

  const isLoading = useProperty(isLoadingProperty);

  useEffect(() => {
    snapshot.startLoad()
    axios.get<Snapshot>('http://localhost:4444/snapshot')
    .then(({ data }) => snapshot.successLoad(data))
    .catch((err) => snapshot.failedLoad(`${err}`));
  }, [])

  return (
    <div>
      <MainToolBar />
      <Container className="p-3">
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Пользователи">
            <Users />
          </Tab>
          <Tab eventKey="profile" title="Группы">
            <Groups />
          </Tab>
        </Tabs>
      </Container>
      {isLoading && <Veil/>}
    </div>
  );
}

export default App;
