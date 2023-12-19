import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from './pages/Update';
import Detail from './pages/Detail';
import UserInforPop from './components/UserInforPop';
import UserInforUpdatePop from './components/UserInforUpdatePop';
import DBControler from "./DBControler";

function App() {
  const [isPopupShow, setisPopupShow] = useState(false);
  const [isUpdatePopupShow, setisUpdatePopupShow] = useState(false);
  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);
  const [thumbnail, setthumbnail] = useState("");
  const [postDate, setpostDate] = useState("");
  const [postContent, setpostContent] = useState("");
  const [weight, setweight] = useState(0);

  useEffect(()=>{
    var request = window.indexedDB.open('DiaryDB', '2');

    request.onerror = function(event) {
        console.log(event.target.errorCode);
    }

    request.onsuccess = function(event) {
        var db = request.result;
        var transaction = db.transaction(['user']);
        
        transaction.onerror = function(event) {
            console.log('fail');
        }

        transaction.oncomplete = function(event) {
            console.log('done');
        }
        
        var objectStore = transaction.objectStore('user');
        request = objectStore.get(1);
        request.onsuccess = function(event) {
          setUser(event.target.result);
        }

        transaction.oncomplete = () => {
            db.close();
        }
    }
}, []);

  function close_pop() {
    setisPopupShow(false);
  }
  function open_user_infor_pop() {
    setisPopupShow(true);
  }

  function close_update_pop() {
    setisUpdatePopupShow(false);
  }

  function open_update_pop() {
    setisUpdatePopupShow(true);
  }
  
  return (
    <div className="App">
      {isPopupShow && <UserInforPop close_pop={close_pop} user={user} post={post}/>}
      {isUpdatePopupShow && <UserInforUpdatePop close_pop={close_update_pop} user={user}/>}

      <BrowserRouter>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css"></link>
      <div className="container">
        <div className="top-nav">
          <Link to="/"><div className="title">{user.name}의 성장일지</div></Link>
          <a className="settings-btn" onClick={open_update_pop}><i className="bi bi-gear" /> Settings</a>
          <Link className="write-btn" to="/Create"><i className="bi bi-vector-pen" /> Write</Link>
          <a className="user-infor" onClick={open_user_infor_pop}><i className="bi bi-person-circle" /></a>
        </div>
        <Routes>
            <Route path={"/"} element={<Home setPost={setPost}/>}></Route>
            <Route path={"/Create"} element={<Create />}></Route> 
            <Route path={"/Update/:id"} element={<Update />}></Route> 
            <Route path={"/Detail/:id"} element={<Detail />}></Route> 
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
