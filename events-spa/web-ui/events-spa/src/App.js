//based on code from Nat Tuck's Lectures
import React from 'react';
import {Container} from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";
import Users from "./Users";
import { Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Feed from "./Feed";
import UsersNew from './Users/New';
import Events from './Events/Events';
import EventsNew from './Events/New';
import CommentsNew from './Comments/New';

function App() {
  return (

    <Container>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <h1>Events Feed</h1>
          <Feed />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/users/new">
          <UsersNew />
        </Route>
        <Route path="/events/new">
          <EventsNew />
        </Route>
        <Route path="/comment/new">
          <CommentsNew />
        </Route>
        <Route path="/events">
          <Events />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
