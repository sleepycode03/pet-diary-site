import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useState} from 'react';
import ItemList from "../components/ItemList"

function Home({setPost}) {
  return (
    <div className="Home">
        <ItemList setPost={setPost}/>
    </div>
  );
}

export default Home;