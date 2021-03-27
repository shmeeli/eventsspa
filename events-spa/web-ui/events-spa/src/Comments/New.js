import { Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { create_comment } from '../api';
import { useHistory } from 'react-router-dom';
//code based on Nat Tuck's lectures

export default function CommentsNew(event) {
  let history = useHistory();
  let [comment, setComment] = useState({});

  function onSubmit(ev) {
    ev.preventDefault();
    let p1 = Object.assign({}, comment);
    p1["event_id"] = event.id;
    create_comment(p1);
    history.push("/");
  }

  function updateBody(ev) {
    let p1 = Object.assign({}, comment);
    //p1["user_id"] = session.user_id;
    p1["body"] = ev.target.value;

    setComment(p1);
  }

  return (
    <Row>
      <Col>
        <h2>New Comment</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={updateBody}
                          value={event.body} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
