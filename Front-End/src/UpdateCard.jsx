import React, { useState, useEffect, useRef } from "react";
import Card from 'react-bootstrap/Card';

function UpdateCard(props) {

  const [titleResponse, setTitleResponse] = useState('');
  const [authorResponse, setAuthorResponse] = useState('');
  const [imgResponse, setImgResponse] = useState('');
  const [isbnResponse, setIsbnResponse] = useState('');
  const [priceResponse, setPriceResponse] = useState('');
  const [response, setResponse] = useState('');

  const recordResponse = (event) => {
    setResponse(event.target.value);
  }

  const recordTitle = (event) => {
    setTitleResponse(event.target.value);
  }
  const recordAuthor = (event) => {
    setAuthorResponse(event.target.value);
  }
  const recordImg = (event) => {
    setImgResponse(event.target.value);
  }
  const recordIsbn = (event) => {
    setIsbnResponse(event.target.value);
  }
  const recordPrice = (event) => {
    setPriceResponse(event.target.value);
  }

  function submitResponse()  {
    props.setBookID(response)
    props.setBookData({
      title: titleResponse,
      author: authorResponse, 
      cover: imgResponse,
      isbn: isbnResponse,
      price: priceResponse
    })

    props.setSubmitUpdate(!props.submitUpdate)
    props.setUpdate(!props.update)
  }

  const uCard = useRef(null);
  useEffect(() => {
    uCard.current.scrollIntoView({ behavior: "smooth" });
  }, [Card]);

  return (
    <Card id="dataCard" style={{ display: 'inline-block'}}>
      <Card.Text className='bookText' style={{color: 'white'}}></Card.Text>
      <video width='450' controls autoPlay name='media'>
        <source src="https://media.istockphoto.com/id/1207745492/video/stedicam-shot-camera-moves-forward-along-shelves-filled-with-paper-books-the-huge-round.mp4?s=mp4-640x640-is&k=20&c=-7kpTeGC4T7LphcRat1Vo7ktnLWI_DNdt-1lo1FnXVk=" type="video/mp4" />
      </video>
      <Card.Body>
        <Card.Text><input id='id' className='bookInput' placeholder='Book ID Number' onChange={recordResponse}></input></Card.Text>
        <Card.Text><input id='img' className='bookInput' placeholder='Book Image URL' onChange={recordImg}></input></Card.Text>
        <Card.Title><input id='title' className='bookInput' placeholder='Book Title' onChange={recordTitle}></input></Card.Title>
        <Card.Text><input id='author' className='bookInput' placeholder='Book Author' onChange={recordAuthor}></input></Card.Text>
        <Card.Text><input id='isbn' className='bookInput' placeholder='Book ISBN Number' onChange={recordIsbn}></input></Card.Text>
        <Card.Text><input id='price' className='bookInput' placeholder='Book Price' onChange={recordPrice}></input></Card.Text>
        <div className="btn btn-three"
        onClick={()=> submitResponse()}
        ><span>SUBMIT</span></div>
      </Card.Body>
      <div ref={uCard}/>
    </Card>
  );
}

export default UpdateCard;