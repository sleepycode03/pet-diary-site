import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useState} from 'react';
import WeightChart from './WeightChart';
import "./UserInforPop.css";

function UserInforPop({close_pop ,user}) {
  return (
    <div className="UserInforPop">
      <div className="user-infor-popup-content">
        <table border={0} className="user-infor-tb">
          <tbody><tr>
              <td className="species">이름 :</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td className="species">종 :</td>
              <td>{user.species}</td>
            </tr>
            <tr>
              <td className="birthday">생일 :</td>
              <td>{user.birth}</td>
            </tr>
          </tbody></table>
        <h4>&lt; 최근 30일간의 몸무게 변화 &gt;</h4>
        <div className="weight-chart"><WeightChart/></div>
        <div className="close-btn" onClick={close_pop}>
          <span className="pop_bt" style={{fontSize: '13pt'}}>닫 기</span>
        </div>
      </div>
    </div>
  );
}

export default UserInforPop;