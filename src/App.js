import React, { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from './store';
import { setAuthToken } from './utils/setAuthToken';
import { load } from './actions/user';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Post from './components/Post';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(load())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Header />
          <Switch>
            <Route path="/post/:id" component={Post} />
            <Route exact path="/" component={Home} />
            <Route exact path="/posts" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
      </Router>
    </Provider>
  );
}



export default App;
