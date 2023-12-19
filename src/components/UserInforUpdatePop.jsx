import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import DBControler from '../DBControler';
import "./UserInforUpdatePop.css";

function UserInforUpdatePop({close_pop, user}) {
    const[name, setName] = useState(user.name);
    const[species, setspecies] = useState(user.species);
    const[birth, setbirth] = useState(user.birth);

    function saveDataDB(){
        alert('수정되었습니다.');
        DBControler.updateUserDB({name:name, species:species, birth:birth});
        close_pop();
        window.location.replace("/")
    }

    function onChangeName(e) {
        console.log(e.target.value);
        setName(e.target.value);
    }

    function onChangeSpecies(e) {
        console.log(e.target.value);
        setspecies(e.target.value);
    }

    function onChangeBirth(e) {
        console.log(e.target.value);
        setbirth(e.target.value);
    }

    return (
        <div className="UserInforUpdatePop">
        <div className="user-infor-update-popup-content">
            <table border={0} className="user-infor-tb">
            <tbody>
                <tr className="name">
                <td className="name">이름 :</td>
                <td><input type="text" defaultValue={user.name} onChange={onChangeName}/></td>
                </tr>
                <tr className="species">
                <td className="species">종 :</td>
                <td><input type="text" defaultValue={user.species} onChange={onChangeSpecies}/></td>
                </tr>
                <tr className="birthday">
                <td className="birthday">생일 :</td>
                <td><input type="date" defaultValue={user.birth} onChange={onChangeBirth}/></td>
                </tr>
            </tbody></table>
            <div className="btn" onClick={saveDataDB}>
            <span className="pop_bt" style={{fontSize: '13pt'}}>저 장</span>
            </div>
            <div className="btn" onClick={close_pop}>
            <span className="pop_bt" style={{fontSize: '13pt'}}>닫 기</span>
            </div>
        </div>
        </div>
    );
}

export default UserInforUpdatePop;