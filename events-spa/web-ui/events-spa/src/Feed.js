// Feed.js
import { Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import React from 'react';
import { Link } from './Nav';
//code based on Nat Tuck's lectures


function Event({event}) {

  return (
    <Row>
      <Card style={{width: '40rem'}}>
        <Card.Text>
          {event.title}<br />
          Hosted by {event.user.name}<br />
          {event.date}
          <Link to={"/events/" + event.id}>Event</Link>
        </Card.Text>
      </Card>
    </Row>
  );
}

function Feed({events}) {
  let cards = events.map((event) => <Event event={event} key={event.id} />);
  return (<div>
    <p><Link to="/events/new">New Event</Link></p>
      <Col>
        { cards }
      </Col>
    </div>
  );
}

export default connect(({events}) => ({events}))(Feed);
