import React, { useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";

function BookCard(props) {
  const bCard = useRef(null);
  useEffect(() => {
    bCard.current.scrollIntoView({ behavior: "smooth" });
  }, [Card]);

  return (
    <Card style={{ display: "inline-block" }}>
      <Card.Text className="bookText">Book Stock #{props.id}</Card.Text>
      <Card.Img variant="top" src={props.cover} />
      <Card.Body>
        <Card.Title className="bookText">{props.title}</Card.Title>
        <Card.Text className="bookText">{props.author}</Card.Text>
        <div
          style={{ cursor: "pointer" }}
          onClick={() =>
            window.open(`https://www.google.com/search?q=${props.isbn}`)
          }
        >
          <a id="isbnLink">isbn: {props.isbn}</a>
        </div>
        <Card.Text className="bookText">{props.price}</Card.Text>
      </Card.Body>
      <div ref={bCard} />
    </Card>
  );
}

export default BookCard;
