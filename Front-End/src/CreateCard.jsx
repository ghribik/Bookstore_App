import React from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";

function CreateCard(props) {
  const [titleResponse, setTitleResponse] = useState("");
  const [authorResponse, setAuthorResponse] = useState("");
  const [imgResponse, setImgResponse] = useState("");
  const [isbnResponse, setIsbnResponse] = useState("");
  const [priceResponse, setPriceResponse] = useState("");

  const recordTitle = (event) => {
    setTitleResponse(event.target.value);
  };
  const recordAuthor = (event) => {
    setAuthorResponse(event.target.value);
  };
  const recordImg = (event) => {
    setImgResponse(event.target.value);
  };
  const recordIsbn = (event) => {
    setIsbnResponse(event.target.value);
  };
  const recordPrice = (event) => {
    setPriceResponse(event.target.value);
  };

  function submitResponse() {
    props.setBookData({
      title: titleResponse,
      author: authorResponse,
      cover: imgResponse,
      isbn: isbnResponse,
      price: priceResponse,
    });

    props.setSubmitCreate(!props.submitCreate);
    props.setCreate(!props.create);
  }

  return (
    <Card id="dataCard" style={{ display: "inline-block" }}>
      <Card.Text className="bookText" style={{ color: "white" }}></Card.Text>
      <video width="450" controls autoPlay name="media">
        <source
          src="https://media.istockphoto.com/id/539413204/video/ld-typing-by-pressing-the-keys-of-typewriter-in-hurry.mp4?s=mp4-640x640-is&k=20&c=GZLXnh-7jmZB6hMXcKv24qbfwfiROSXfxN17ibYNlA4="
          type="video/mp4"
        />
      </video>
      <Card.Body>
        <Card.Text>
          <input
            id="img"
            className="bookInput"
            type="text"
            placeholder="Book Image URL"
            onChange={recordImg}
          ></input>
        </Card.Text>
        <Card.Title>
          <input
            id="title"
            className="bookInput"
            type="text"
            placeholder="Book Title"
            onChange={recordTitle}
          ></input>
        </Card.Title>
        <Card.Text>
          <input
            id="author"
            className="bookInput"
            type="text"
            placeholder="Book Author"
            onChange={recordAuthor}
          ></input>
        </Card.Text>
        <Card.Text>
          <input
            id="isbn"
            className="bookInput"
            type="text"
            placeholder="Book ISBN Number"
            onChange={recordIsbn}
          ></input>
        </Card.Text>
        <Card.Text>
          <input
            id="price"
            className="bookInput"
            type="text"
            placeholder="Book Price"
            onChange={recordPrice}
          ></input>
        </Card.Text>
        <div className="btn btn-three" onClick={() => submitResponse()}>
          <span>SUBMIT</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CreateCard;
