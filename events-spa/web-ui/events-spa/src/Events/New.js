import { Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { create_event } from '../api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
//code based on Nat Tuck's lectures

export default function EventsNew() {
  let history = useHistory();
  let [event, setEvent] = useState({});
  let [date, setDate] = useState(new Date());

  function onSubmit(ev) {
    let p1 = Object.assign({}, event);
    p1["date"] = date.toString();
    console.log(p1);
    setEvent(p1);

    create_event(p1);
    history.push("/");
  }

  function updateBody(ev) {
    let p1 = Object.assign({}, event);
    //p1["user_id"] = session.user_id;
    p1["body"] = ev.target.value;

    setEvent(p1);
  }

  function updateTitle(ev) {
    let p1 = Object.assign({}, event);
    //p1["user_id"] = session.user_id;
    p1["title"] = ev.target.value;

    setEvent(p1);
  }


  return (
    <Row>
      <Col>
        <h2>New Event</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Event Name</Form.Label>
            <Form.Control as="textarea"
                          rows={1}
                          onChange={updateTitle}
                          value={event.title} />
          </Form.Group>

          <Form.Group>
          <Form.Label>Date</Form.Label>




          </Form.Group>
          <DatePicker selected={date} onChange={date => setDate(date)} />
          <Form.Group>
            <Form.Label>Description</Form.Label>
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
