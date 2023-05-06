import './App.css';
import { Container } from 'react-bootstrap';
import { Users } from './components/users';
import { Groups } from './components/groups';
import { MainToolBar } from './components/mainbar';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Page, Snapshot } from './abstract';
import { isLoadingProperty, pageProperty, snapshot } from './store';
import { Veil } from './components/veil';
import { persistantProp } from './store/persistant';
import { Persistant } from './abstract/persistant';
import styled from 'styled-components';
import { API_URL } from './config';
import { ToastContainer } from 'react-toastify';
import { useProperty } from './hoc/use-property';

const PERSISTANT_KEY = 'PERSISTANT';

const pageComponentMap: Record<Page, JSX.Element> = {
  groups: <Groups />,
  users: <Users />
}

const RootContainer = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    grid-gap: 10px;
    height: 100vh;
    width: 100vw;
  `;

function App() {

  const isLoading = useProperty(isLoadingProperty);

  useEffect(() => {
    snapshot.startLoad()
    axios.get<Snapshot>(`${API_URL}snapshot`)
      .then(({ data }) => snapshot.successLoad(data))
      .catch((err) => snapshot.failedLoad(`${err}`));
  }, [])

  useEffect(() => {
    const persistant = localStorage.getItem(PERSISTANT_KEY); //TODO: sanitaze input
    persistant && persistantProp.update(JSON.parse(persistant) as unknown as Persistant);
    const sub = persistantProp.subscribe({
      next: () => {
        localStorage.setItem(PERSISTANT_KEY, JSON.stringify(persistantProp.get()))
      }
    });

    return () => sub.unsubscribe();
  }, [])

  useEffect(() => {
    document.title = 'IPG - Пользователи';
  }, []);

  const page = useProperty(pageProperty);

  console.log('XXX', isLoading)

  return (
    <RootContainer>
      <MainToolBar />
      <Container className="p-3 m-3 overflow-auto">
        {pageComponentMap[page]}
      </Container>
      {isLoading && <Veil />}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </RootContainer>
  );
}

export default App;
