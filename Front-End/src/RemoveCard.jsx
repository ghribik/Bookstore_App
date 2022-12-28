import React from 'react';
import { useState } from "react";
import Card from 'react-bootstrap/Card';

function RemoveCard(props) {

  const [response, setResponse] = useState('');

  const recordResponse = (event) => {
    setResponse(event.target.value);
  }

  function submitResponse() {
    props.setBookID(response)
    props.setSubmitRemove(!props.submitRemove)
    props.setRemove(!props.remove)
  }

  return (
    <Card id="dataCard" style={{ display: 'inline-block'}}>
      <Card.Text className='bookText' style={{color: 'white'}}></Card.Text>
      <video width='450' controls autoPlay name='media'>
        <source src="https://media.istockphoto.com/id/1031393728/video/stack-of-books-burning.mp4?s=mp4-640x640-is&k=20&c=ZpjjfGuJQyp7v1Y5Nfdpb-I8ETR4RXG-zEUfJ3Vv6d4=" type="video/mp4" />
      </video>
      <Card.Body>
      <Card.Text><input id='img' className='bookInput' type='text' placeholder='Book ID Number' onChange={recordResponse}></input></Card.Text>
        <div className="btn btn-three"
        onClick={()=> submitResponse()}
        ><span>SUBMIT</span></div>
      </Card.Body>
    </Card>
  );
}

export default RemoveCard;