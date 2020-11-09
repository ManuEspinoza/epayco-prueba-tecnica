import React from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import RegisterClient from './containers/RegisterClient/RegisterClient';
import MakePayment from './containers/MakePayment/MakePayment';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/register" component={RegisterClient} />
          <Route path="/payment" component={MakePayment} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
