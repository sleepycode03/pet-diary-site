import React from "react";
import { Link } from 'react-router-dom';

function Item({id, content, weight, date, thumbnail}) {

  return (
    <div className="item">
        <Link to={`/Detail/${id}`} state={{id:id, content,content, weight, weight, date:date, thumbnail, thumbnail}}><img className="thumb-img" src={thumbnail}/></Link>
        <div className="write-Date">{date}</div>
        <div className="content">{content}</div>
    </div>
  )
};

export default Item;