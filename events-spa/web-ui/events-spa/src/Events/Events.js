import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';
import NewComments from '../Comments/New';
import { delete_comment, fetch_comments } from '../api';

import { useHistory } from 'react-router-dom';
//code based on Nat Tuck's lectures

function DeleteComment({comment}) {
  let history = useHistory();

  function onSubmit(ev) {

    delete_comment(comment.id).then(() => {
      fetch_comments();
      history.push("/");
    });
  }

  return (
    <Row>

        <Form onSubmit={onSubmit}>

          <Button variant="primary"
                  type="submit">
            Delete
          </Button>
        </Form>
    </Row>
  );
}


function Comment({comment}) {

  return (
    <Row>
      <Card style={{width: '40rem'}}>
        <Card.Text>
          Posted by {comment.user.name}<br />
          {comment.body}
        </Card.Text>

      </Card>
    </Row>
  );
}



function Event({events,comments}) {

  console.log("comments");
  console.log(comments);
  let event = null;
  let url = window.location.href;
  let id = url.substring(url.lastIndexOf('/') + 1);
  for (var i = 0; i < events.length; i++) {
    if(events[i].id == id) {
      event = events[i];
    }
  }
  let comment_list = [];
  for (var j = 0; j < comments.length; j++) {
    if(comments[j].event.id == id) {
      console.log(comments[j].event.id);
      console.log(id);
      comment_list.push(comments[j]);
    }
  }
  let cards = comment_list.map((comment) => <Comment comment={comment} key={comment.id} />);


  return (
    <Col>
      <Card>
        <Card.Text>
        {event.title}<br />
        Hosted by {event.user.name}<br />
        {event.date}<br />
        {event.body}
        </Card.Text>
      </Card>
      <Card>
        <NewComments event={event}/>
      </Card>

      <Col>
        { cards }
      </Col>
    </Col>
  );
}

function state2props({events, comments}) {
  return { events, comments };
}

export default connect(({events, comments}) => ({events, comments}))(Event);
