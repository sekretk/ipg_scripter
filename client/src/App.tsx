import React, { useEffect } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  useEffect(() => {
    fetch('http://localhost:4444/snapshot').then(_ => _.json()).then(_ => console.log(_))
  }, [])

  return (
    <div className="container">
      <header className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills">
          <li className="nav-item"><a href="#" className="nav-link">Создать пользователя</a></li>
          <input id="folderName" />
          <li className="nav-item"><a id="createFolder" href="#" className="nav-link">Создать каталог</a></li>
        </ul>
      </header>
      {/* Всего пользователей {{ length }}
      <div className="container-fluid pb-3">
        <div className="d-grid gap-3">
          <div className="bg-light border rounded-3">
            <ul className="list-group">
              {{ #each users }}
              <a class="list-group-item list-group-item-action {{#if this.disabled }}disabled{{/if}} " href="/users/{{this.name}}">
                <span class="badge badge-success {{this.unit}}">{{ this.unit }}</span>
                <span>{{ this.name }}</span> (<span>{{ this.fullname }}</span>) - <span>{{ this.lastLogin }}</span>
              </a>
              {{/ each}}
            </ul>
          </div>
        </div>
      </div> */}
      <div id="veil" className="veil">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default App;
