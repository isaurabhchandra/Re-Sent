import { Switch } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './page/Signin';
import Home from './page/Home';
import PublicRoute from './components/PublicRoute';
function App() {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>

      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
