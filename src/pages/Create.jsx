import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import DBControler from '../DBControler';
import "./Create.css"

function Create() {
    const [isPopupShow, setisPopupShow] = useState(false);
    const [thumbnail, setthumbnail] = useState("");
    const [postDate, setpostDate] = useState("");
    const [postContent, setpostContent] = useState("");
    const [weight, setweight] = useState(0);

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
        alert("저장되었습니다");
        DBControler.appendData(postContent, weight, postDate, thumbnail);
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
        <div className="Create">
            <div className="write-container">
                <div className="input-lnfor-group">
                    <label className="date-form">날짜:
                        <input type="date" name="schedule" min="2000-01-01" max="2100-12-31" onChange={onChangeDate}/>
                    </label>
                    <img className="thumbnail" src={thumbnail}/>
                    <input type="file" accept="image/*" className="thumbnail-form" onChange={(e)=>{onChangeThumbnail(e.target.files[0])}} />
                    <label className="weight">몸무게(g):
                        <input type="number" min={100} max={100000} step="1" onChange={onChangeWeight}/>
                    </label>     
                </div>
                <textarea name="main-content" placeholder="오늘 있었던 일을 적어보세요..." defaultValue={""} onChange={onChangeContent}/>
                <div className="btn-group">
                    <button className="cancel-btn">취 소</button>
                    <Link to="/"><button className="save-btn" onClick={()=>{saveDataDB()}}>저 장</button></Link>
                </div>
        </div>
        </div>
    );
}

export default Create;