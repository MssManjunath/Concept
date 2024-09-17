import Nav from './components/nav';
import Login from './components/login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TextEditor from "./components/TextEditor";
import React, { useEffect, useState } from "react";
import Home from './components/home';
import Notes from './components/notes';




function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = "We are running this as a demo";
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* {data ? <TextEditor initialData={data} imageUrl={"https://picsum.photos/1080/720?grayscale"}/> : <p>Loading...</p>} */}
    {/* <TextEditor textContent={" This is sample text"}/> */}
    <Router>
    <Nav/>
    <div className='container'>
    <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route  path = "/home" element = {<Home />} />
          <Route  path = "/notes" element = {<Notes />} />
          <Route path='/textEditor' element = {<TextEditor />} />
        </Routes>
    </div>
    </Router>
    </div>
  );
}

export default App;
