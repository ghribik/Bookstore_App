import React from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";

function AuthorCard(props) {
  const [response, setResponse] = useState("");

  const recordResponse = (event) => {
    setResponse(event.target.value);
  };

  function submitResponse() {
    props.setBookAuthor(response);
    props.setSubmitAuthor(!props.submitAuthor);
    props.setAuthor(!props.author);
  }

  const aCard = useRef(null);
  useEffect(() => {
    aCard.current.scrollIntoView({ behavior: "smooth" });
  }, [Card]);

  return (
    <Card id="dataCard" style={{ display: "inline-block" }}>
      <Card.Text className="bookText" style={{ color: "white" }}></Card.Text>
      <video width="450" controls autoPlay name="media">
        <source
          src="https://media.istockphoto.com/id/815982204/video/skull-held-out-theater-acting-concept.mp4?s=mp4-640x640-is&k=20&c=mEJUcFmD3fq8sBpJoPlQo99Z5shod5mY1cf_ggwi_VA="
          type="video/mp4"
        />
      </video>
      <Card.Body>
        <Card.Text>
          <input
            id="img"
            className="bookInput"
            type="text"
            placeholder="Enter Author Name"
            onChange={recordResponse}
          ></input>
        </Card.Text>
        <div className="btn btn-three" onClick={() => submitResponse()}>
          <span>SUBMIT</span>
        </div>
      </Card.Body>
      <div ref={aCard}/>
    </Card>
  );
}

export default AuthorCard;
