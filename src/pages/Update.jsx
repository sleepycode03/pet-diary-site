import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import DBControler from '../DBControler';
import "./Create.css"

function Update() {
    const [isPopupShow, setisPopupShow] = useState(false);
    const [thumbnail, setthumbnail] = useState("");
    const [postDate, setpostDate] = useState("");
    const [postContent, setpostContent] = useState("");
    const [weight, setweight] = useState(0);
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
                setthumbnail(event.target.result.thumbnail);
                setpostDate(event.target.result.date);
                setpostContent(event.target.result.content);
                setweight(event.target.result.weight);
            }

            transaction.oncomplete = () => {
                db.close();
            }
        }
    }, []);



    const onChangeThumbnail = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            console.log(reader.result);
            setthumbnail(reader.result);
            resolve();
          };
        });
    };

    function saveDataDB(){
        alert('수정되었습니다.');
        DBControler.updateIndexedDB(Number(id), {content:postContent, weight:weight, date:postDate, thumbnail:thumbnail});
    }

    function onChangeContent(e) {
        console.log(e.target.value);
        setpostContent(e.target.value);
    }

    function onChangeDate(e) {
        console.log(e.target.value);
        setpostDate(e.target.value);
    }

    function onChangeWeight(e) {
        console.log(e.target.value);
        setweight(e.target.value);
    }

    return (
        <div className="Update">
            <div className="write-container">
                <div className="input-lnfor-group">
                    <label className="date-form">날짜:
                        <input type="date" name="schedule" min="2000-01-01" max="2100-12-31" onChange={onChangeDate} defaultValue={post.date}/>
                    </label>
                    <img className="thumbnail" src={thumbnail}/>
                    <input type="file" accept="image/*" className="thumbnail-form" onChange={(e)=>{onChangeThumbnail(e.target.files[0])}}/>
                    <label className="weight">몸무게(g):
                        <input type="number" min={10} max={100000} step="1" onChange={onChangeWeight} defaultValue={post.weight}/>
                    </label>     
                </div>
                <textarea name="main-content" placeholder="오늘 있었던 일을 적어보세요..." defaultValue={post.content} onChange={onChangeContent}/>
                <div className="btn-group">
                    <Link to={`/Detail/${id}`}><button className="cancel-btn">취 소</button></Link>
                    <Link to="/"><button className="save-btn" onClick={()=>{saveDataDB()}}>저 장</button></Link>
                </div>
        </div>
        </div>
    );
}

export default Update;