import React from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import RegisterClient from './containers/RegisterClient/RegisterClient';
import MakePayment from './containers/MakePayment/MakePayment';
import GetBalance from './containers/Balance/GetBalance/GetBalance';
import AddBalance from './containers/Balance/AddBalance/AddBalance';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/register" component={RegisterClient} />
          <Route path="/payment" component={MakePayment} />
          <Route path="/balance" component={GetBalance} />
          <Route path="/add-balance" component={AddBalance} />
          <Route path="/" render={() => (<h1 style={{ textAlign: 'center', width: '500px', margin: '0 auto', fontSize: '64px' }}>Bienvenido a la billetera virtual por favor escoge una opción</h1>)} />        
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
