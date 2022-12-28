import { useState, useEffect, useRef } from "react";
import "./App";
import BookCard from "./BookCard";
import UpdateCard from "./UpdateCard";
import CreateCard from "./CreateCard";
import RemoveCard from "./RemoveCard";
import AuthorCard from "./AuthorCard";

function App() {
  const [count, setCount] = useState(0);
  const [apidata, setAPIData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const readIsMounted = useRef(false);
  const authorIsMounted = useRef(false);
  const updateIsMounted = useRef(false);
  const createIsMounted = useRef(false);
  const deleteIsMounted = useRef(false);

  const [update, setUpdate] = useState(null);
  const [create, setCreate] = useState(null);
  const [remove, setRemove] = useState(null);
  const [author, setAuthor] = useState(null);
  const [displayAuthor, setDisplayAuthor] = useState(null);

  const [readDisplay, setReadDisplay] = useState(null);
  const [submitCreate, setSubmitCreate] = useState(null);
  const [submitRemove, setSubmitRemove] = useState(null);
  const [submitUpdate, setSubmitUpdate] = useState(null);
  const [submitAuthor, setSubmitAuthor] = useState(null);

  const [bookData, setBookData] = useState({});
  const [bookID, setBookID] = useState(null);
  const [bookAuthor, setBookAuthor] = useState(null);

  let createBookProps = {
    create,
    setCreate,
    submitCreate,
    setSubmitCreate,
    bookData,
    setBookData,
  };

  let deleteBookProps = {
    remove,
    setRemove,
    submitRemove,
    setSubmitRemove,
    bookID,
    setBookID,
  };

  let updateBookProps = {
    update,
    setUpdate,
    submitUpdate,
    setSubmitUpdate,
    bookID,
    setBookID,
    bookData,
    setBookData,
  };

  let getAuthorProps = {
    author,
    setAuthor,
    submitAuthor,
    setSubmitAuthor,
    bookAuthor,
    setBookAuthor,
  };

  let API_URL = "https://book-store-api.onrender.com";
  // let API_URL = "http://localhost:5000";

  useEffect(() => {
    if (readIsMounted.current && readDisplay) {
      fetch(`${API_URL}/api/books`)
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(true);
            setAPIData(result);
            console.log("API data fetched");
            console.log(result);
          },
          (error) => {
            setLoading(true);
            setError(error);
            alert(error);
          }
        );
    } else {
      readIsMounted.current = true;
    }
  }, [readDisplay]);

  useEffect(() => {
    if (authorIsMounted.current && submitAuthor) {
      fetch(`${API_URL}/api/author/` + bookAuthor)
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(true);
            setAPIData(result);
            setReadDisplay(null);
            setDisplayAuthor(true);
            setSubmitAuthor(null);
            console.log("API author data fetched");
            console.log(result);
          },
          (error) => {
            setLoading(true);
            setError(error);
            alert(error);
          }
        );
    } else {
      authorIsMounted.current = true;
    }
  }, [submitAuthor]);

  useEffect(() => {
    if (updateIsMounted.current && submitUpdate) {
      fetch(`${API_URL}/api/books/${bookID}`, {
        method: "PATCH",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(true);
            setAPIData(result);
            setReadDisplay(true);
            setSubmitUpdate(null);
            console.log("API data patched");
            console.log(result);
          },
          (error) => {
            setLoading(true);
            setError(error);
            alert(error);
          }
        );
    } else {
      updateIsMounted.current = true;
    }
  }, [submitUpdate]);

  useEffect(() => {
    if (createIsMounted.current && submitCreate) {
      fetch(`${API_URL}/api/books`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(true);
            setAPIData(result);
            setReadDisplay(true);
            setSubmitCreate(null);
            console.log("user data posted to API");
            console.log(result);
          },
          (error) => {
            setLoading(true);
            setError(error);
            alert(error);
          }
        );
    } else {
      createIsMounted.current = true;
    }
  }, [submitCreate]);

  useEffect(() => {
    if (deleteIsMounted.current && submitRemove) {
      fetch(`${API_URL}/api/books/${bookID}`, {
        method: "DELETE",
        mode: "cors",
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(true);
            setAPIData([result]);
            setReadDisplay(true);
            setSubmitRemove(null);
            console.log("data deleted from API");
            console.log(result);
          },
          (error) => {
            setLoading(true);
            setError(error);
            alert(error);
          }
        );
    } else {
      deleteIsMounted.current = true;
    }
  }, [submitRemove]);

  return (
    <div className="App">
      <div id="TitleHeader">
        <h1 style={{ color: "white", fontWeight: "bold" }}>
          <em>Treat Yo' Shelf</em>
        </h1>
      </div>

      <div id="navbar">
        <div className="buttonHolder">
          <div>
            <img
              id="home"
              src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
              onClick={() => {
                setReadDisplay(null),
                  setAuthor(null),
                  setDisplayAuthor(null),
                  setUpdate(null),
                  setCreate(null),
                  setRemove(null);
              }}
            />
          </div>
          <div
            className="btn btn-three"
            onClick={() => {
              setReadDisplay(!readDisplay), setDisplayAuthor(null);
            }}
          >
            <span>Read</span>
          </div>
          <div
            className="btn btn-three"
            onClick={() => {
              setAuthor(!author), setDisplayAuthor(null);
            }}
          >
            <span>Author</span>
          </div>
          <div
            className="btn btn-three"
            onClick={() => {
              setUpdate(!update);
            }}
          >
            <span>Edit</span>
          </div>
          <div
            className="btn btn-three"
            onClick={() => {
              setCreate(!create);
            }}
          >
            <span>Add</span>
          </div>
          <div
            className="btn btn-three"
            onClick={() => {
              setRemove(!remove);
            }}
          >
            <span>Remove</span>
          </div>
        </div>
        <div>
          <img
            id="bannerImg"
            src="https://cdn.pixabay.com/photo/2015/06/02/12/59/book-794978_960_720.jpg"
          />
        </div>
      </div>

      <div id="bookCards">
        {!remove ? "" : <RemoveCard {...deleteBookProps} />}
      </div>
      <div id="bookCards">
        {!create ? "" : <CreateCard {...createBookProps} />}
      </div>
      <div id="bookCards">
        {!update ? "" : <UpdateCard {...updateBookProps} />}
      </div>
      <div id="bookCards">
        {!author ? "" : <AuthorCard {...getAuthorProps} />}
      </div>
      <div id="bookCards">
        {!readDisplay
          ? ""
          : apidata.map((book, i) => (
              <BookCard
                {...apidata[i]}
                key={book + i}
                className="book"
                book={apidata[i].title}
              />
            ))}
      </div>
      <div id="bookCards">
        {!displayAuthor
          ? ""
          : apidata.map((book, i) => (
              <BookCard
                {...apidata[i]}
                key={book + i}
                className="book"
                book={apidata[i].title}
              />
            ))}
      </div>
    </div>
  );
}

export default App;
