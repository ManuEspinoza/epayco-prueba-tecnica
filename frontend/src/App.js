import classes from './App.module.css';
import { Route, NavLink } from 'react-router-dom';

function App() {
  return (
    <div className={classes.App}>
      <header>
        <nav>
          <ul>
            <li><NavLink to="/register" exact>Registar cliente</NavLink></li>
            <li><NavLink to="/payment" exact>Realizar Pago</NavLink></li>
          </ul>
        </nav>
      </header>
      <Route path="/register" render={() => (<p>Registrar cliente</p>)} />
      <Route path="/payment" render={() => (<p>Realizar Pago</p>)} />
    </div>
  );
}

export default App;
