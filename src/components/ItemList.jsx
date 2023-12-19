import React, {useState, useRef, useEffect} from 'react';
import "./ItemList.css";
import DBControler from '../DBControler';
import Item from './Item';

function ItemList({setPost}) {
    const [PostList, setPostList] = useState([]);;
    DBControler.createObjectStore();
    DBControler.appendBasicData();
    DBControler.appendBasicUserData();

    useEffect(() => {
        var request = window.indexedDB.open('DiaryDB', '2');
    
        request.onerror = function(event) {
            console.log(event.target.errorCode);
        }

        request.onsuccess = function(event) {
            var db = request.result;
            var transaction = db.transaction(['post']);           
            var objectStore = transaction.objectStore('post', 'readonly');
            request = objectStore.getAll();

            request.onsuccess = function(event) {
                setPostList(event.target.result);
                setPost(event.target.result)
            }

            request.onerror = (event) => {
                console.log("error", event);
            }

            transaction.oncomplete = () => {
                db.close();
            }
        }
    }, []);
    
    return (
        <div className="ItemList">
            <div className="item-container">
                {PostList.map((item)=>(
                    <Item key={item.id} {...item}></Item>
                    ))}
            </div>
        </div>
    );
}

export default ItemList;

