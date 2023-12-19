import { BrowserRouter, Routes, Route, useLocation, useParams, Link } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import DBControler from '../DBControler';
import './Detail.css';

function Detail() {
    const {id} = useParams();
    const [post, setPost] = useState({});

    useEffect(()=>{
        var request = window.indexedDB.open('DiaryDB', '2');
    
        request.onerror = function(event) {
            console.log(event.target.errorCode);
        }

        request.onsuccess = function(event) {
            var db = request.result;
            var transaction = db.transaction(['post']);
            
            transaction.onerror = function(event) {
                console.log('fail');
            }

            transaction.oncomplete = function(event) {
                console.log('done');
            }
            
            var objectStore = transaction.objectStore('post');
            request = objectStore.get(Number(id));
            request.onsuccess = function(event) {
                setPost(event.target.result);
            }

            transaction.oncomplete = () => {
                db.close();
            }
        }
    }, []);

    function deletePost() {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            console.log(id);
            DBControler.deleteIndexedDB(Number(id));
        } else {
        console.log("취소. 변화 없음");
        }
    }
    
    // const location = useLocation();
    // const post = {id:location.state.id, content:location.state.content, weight: location.state.weight, date:location.state.date, thumbnail:location.state.thumbnail};

    return (
        <div className="Detail">
            <div className="write-container">
                <div className="input-lnfor-group">
                    <div className="date-text">날짜: {post.date}</div>
                    <img className="thumbnail" src={post.thumbnail}/>
                    <label className="weight">몸무게(g): {post.weight}</label>     
                </div>
                <div className="main-content"><pre>{post.content}</pre></div>
                <div className="btn-group">
                    <Link to={`/Update/${id}`}><button className="update-btn">수 정</button></Link>
                    <Link to="/"><button className="delete-btn" onClick={deletePost}>삭 제</button></Link>
                </div>
            </div>
        </div>
    );
}

export default Detail;