import { Nav, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import React, {useState} from 'react';
import store from './store';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//code based on Nat Tuck's lectures

import { api_login } from './api';

function LoginForm() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  function on_submit(ev) {
    ev.preventDefault();
    api_login(name, pass);
  }

  return (
    <Form onSubmit={on_submit} inline>
      <Form.Control name="name"
                    type="text"
                    onChange={(ev) => setName(ev.target.value)}
                    value={name} />
      <Form.Control name="password"
                    type="password"
                    onChange={(ev) => setPass(ev.target.value)}
                    value={pass} />
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

let SessionInfo = connect()(({session, dispatch}) => {
  function logout() {
    store.dispatch({type: 'session/clear'});
  }


  return (
    <p>
      Logged in as {session.name} &nbsp;
      <Button onClick={logout}>Logout</Button>
    </p>
  );
});

function LOI({session}) {
  if (session) {
    return <SessionInfo session={session} />;
  }
  else {
    return <LoginForm />;
  }
}

const LoginOrInfo = connect(
  ({session}) => ({session}))(LOI);

export function Link({to, children}) {
  return (
    <Nav.Item>
      <NavLink to={to} exact className="nav-link"
               activeClassName="active">
        {children}
      </NavLink>
    </Nav.Item>
  );
}


//Nav Bar at the top
function AppNav({error}) {
  let error_row = null;
  if (error) {
    error_row = (
      <Row>
        <Col>
          <Alert variant="danger">{error}</Alert>
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Row>
        <Col>
          <Nav variant="pills">
          <Link to="/">Event Feed</Link>
          <Link to="/users/new">New User</Link>
        </Nav>
        </Col>
        <Col>
          <LoginOrInfo />
        </Col>
      </Row>
      { error_row }
    </div>
  );
}

export default connect(({error})=>({error}))(AppNav);
