import BlobData from "./ImageBlobData";

var DBControler = {
    idxedDB: window.indexedDB,

    createObjectStore: function() {
        var db;
        var request = this.idxedDB.open('DiaryDB', '2');

        if (!this.idxedDB) {
            window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
        } else {
            request.onerror = function(event) {
            }

            request.onsuccess = function(event) {
                db = request.result;
            }
        }

        request.onupgradeneeded = (e) => {
            console.log("테이블 만들기 시작");
            db = e.target.result;
            var objectStore = db.createObjectStore('post', {keyPath: 'id', autoIncrement : true});
            request.onerror = (e) => console.log('failed');
            request.onsuccess = (e) => {
              console.log("success");
              db = request.result;
            }
            var objectStore = db.createObjectStore('user', {keyPath: 'id', autoIncrement : true});
            request.onerror = (e) => console.log('failed');
            request.onsuccess = (e) => {
              console.log("success");
              db = request.result;
            }
            
        }
    },

    appendBasicData: function() {
        var db;
        var request = this.idxedDB.open('DiaryDB', '2');

        var temporaryData = [
            {
                id: 1,
                content: "먹고 있던 간식을 뺏었더니 개빡쳤다.",
                weight: 7500,
                date: "2023-01-07",
                thumbnail: BlobData[0],
            },
            {
                id: 2,
                content: "헬창",
                weight: 30000,
                date: "2023-01-08",
                thumbnail: BlobData[1],
            },
            {
                id: 3,
                content: "요즘따라 우리집 강아지가 날 한심하게 쳐다본다.",
                weight: 15000,
                date: "2023-01-10",
                thumbnail: BlobData[2],
            },
            {
                id: 4,
                content: "...",
                weight: 8000,
                date: "2023-01-12",
                thumbnail: BlobData[3],
            },
            {
                id: 5,
                content: `레서판다(영어: red panda, 학명: Ailurus fulgens)는 몸길이 45 ~65 cm 꼬리길이 30 ~50 cm 가량의 포유동물이다. '레서팬더'라고도 불리며, 영어표기명은 레드판다(red panda)이다. 중국,미얀마, 부탄, 네팔, 인도에 걸쳐 서식하고 있다. 한국에서는 자생하지는 않으나 동물원에 4마리가 존재한다.

                레서판다의 분류는 확실하지 않은데, 예전엔 아메리카너구리과로 분류되었으나, 연구결과 독립적인 레서판다과로 분류되며, 곰과동물보다는 오히려 족제비나 스컹크에 더 가깝다. 레서판다는 일반적으로 ‘판다’로 불리는 자이언트판다보다 더 먼저 ‘판다’라는 이름이 붙었는데, 이는 네팔 사람들의 말에서 온 것으로, 그 유래는 분명하지 않지만 '대나무잎을 먹는 녀석'이라는 뜻의 'ponya'에서 왔을 것이라는 설이 있다.
                
                레서판다는 야행성이다. 자이언트판다처럼 대나무 잎을 먹는데, 식육목의 소화 기관은 채식을 소화하기 어렵게 되어 있으므로 대나무를 많이 먹어야 한다. 과일, 뿌리, 도토리, 이끼 등도 먹으며, 가끔 새, 알, 작은 설치류, 곤충도 먹는 것으로 알려져 있다. 레서판다는 멸종 위기종이다. 암컷과 수컷이 털 빛깔과 크기가 비슷하다. 앞다리가 안쪽으로 굽으며 발바닥은 편평해서 걸을 때 전면이 바닥에 닿는다. 레서판다의 천적은 눈표범과 담비다.`,
                weight: 1,
                date: "2023-01-13",
                thumbnail: BlobData[4],
            },
        ]

        if (!this.idxedDB) {
            window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
        } else {
            request.onerror = function(event) {
                alert('Database error: ' + event.target.errorCode);
            }
    
            request.onsuccess = function(event) {
                db = request.result;
                var postObjectStore = db.transaction(["post"], "readwrite");
                postObjectStore.oncomplete = function(event) {
                    console.log('done');
                }
                postObjectStore.onerror = function(event) {
                    console.log('fail');
                }

                var objectStore = postObjectStore.objectStore('post');
                for(var data of temporaryData) {
                    request = objectStore.add(data);
                    request.onsuccess = function(event) {
                        console.log(event.target.result);
                    }
                }

                
            }
        }
    },  

    appendBasicUserData: function() {
        var db;
        var request = this.idxedDB.open('DiaryDB', '2');

        if (!this.idxedDB) {
            window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
        } else {
            request.onerror = function(event) {
                alert('Database error: ' + event.target.errorCode);
            }
    
            request.onsuccess = function(event) {
                db = request.result;
                var postObjectStore = db.transaction(["user"], "readwrite");
                postObjectStore.oncomplete = function(event) {
                    console.log('done');
                }
                postObjectStore.onerror = function(event) {
                    console.log('fail');
                }

                var objectStore = postObjectStore.objectStore('user');
                request = objectStore.add({id:1, name:"흰둥이", species:"잡종", birth:"1990-08-08"});
                request.onsuccess = function(event) {
                    console.log(event.target.result);
                }     
            }
        }
    },


    appendData: function(content, weight, date, thumbnail) {
        var db;
        var request = this.idxedDB.open('DiaryDB', '2');

        if (!this.idxedDB) {
            window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
        } else {
            request.onerror = function(event) {
                alert('Database error: ' + event.target.errorCode);
            }
    
            request.onsuccess = function(event) {
                db = request.result;
                var postObjectStore = db.transaction(["post"], "readwrite");
                postObjectStore.oncomplete = function(event) {
                    console.log('done');
                }
                postObjectStore.onerror = function(event) {
                    console.log('fail');
                }

                var objectStore = postObjectStore.objectStore('post');

                request = objectStore.add({content:content, weight:weight, date:date, thumbnail:thumbnail});
                request.onsuccess = function(event) {
                    console.log(event.target.result);
                }


                
            }
        }
    },  

    selectOneIndexedDB: function(key, callback) {
        var request = this.idxedDB.open('DiaryDB', '2');
    
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
            request = objectStore.get(key);
            request.onsuccess = function(event) {
                var result = event.target.result;
            }
        }
    },

    selectAllIndexedDB: function() {
        var postList = [];
        var request = this.idxedDB.open('DiaryDB', '2');
    
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
            request = objectStore.openCursor();

            request.onsuccess = function(event) {
                var cursor = event.target.result;
                if(cursor) {
                    request = objectStore.get(cursor.key);
                    request.onsuccess = function(event) {
                        console.log(event.target.result);
                        postList.push(event.target.result)
                    }
                    cursor.continue();
                }
            }
        }
    },

    updateIndexedDB: function(key, value) {
        var db;
        var request = this.idxedDB.open('DiaryDB', '2');

        if (!this.idxedDB) {
            window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
        } else {
            request.onerror = function(event) {
                alert('Database error: ' + event.target.errorCode);
            }
    
            request.onsuccess = function(event) {
                db = request.result;
                var postObjectStore = db.transaction(["post"], "readwrite");
                postObjectStore.oncomplete = function(event) {
                    console.log('done');
                }
                postObjectStore.onerror = function(event) {
                    console.log('fail');
                }

                var objectStore = postObjectStore.objectStore('post');
                request = objectStore.get(key);
                request.onsuccess = function(event) {
                    var data = event.target.result;
                    data = value;
                    data.id = key
                    var updateRequest = objectStore.put(data);
                    updateRequest.onerror = function(event) {
                        console.log('update error');
                    }

                    updateRequest.onsuccess = function(event) {
                        console.log('update success');
                    }
                }

                
            }
        }
    }, 

    updateUserDB: function(value) {
        var db;
        var request = this.idxedDB.open('DiaryDB', '2');

        if (!this.idxedDB) {
            window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
        } else {
            request.onerror = function(event) {
                alert('Database error: ' + event.target.errorCode);
            }
    
            request.onsuccess = function(event) {
                db = request.result;
                var postObjectStore = db.transaction(["user"], "readwrite");
                postObjectStore.oncomplete = function(event) {
                    console.log('done');
                }
                postObjectStore.onerror = function(event) {
                    console.log('fail');
                }

                var objectStore = postObjectStore.objectStore('user');
                request = objectStore.get(1);
                request.onsuccess = function(event) {
                    var data = event.target.result;
                    data = value;
                    data.id = 1
                    var updateRequest = objectStore.put(data);
                    updateRequest.onerror = function(event) {
                        console.log('update error');
                    }

                    updateRequest.onsuccess = function(event) {
                        console.log('update success');
                    }
                }

                
            }
        }
    }, 

    deleteIndexedDB(key) {
        var db;
        var request = this.idxedDB.open('DiaryDB', '2');

        if (!this.idxedDB) {
            window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
        } else {
            request.onerror = function(event) {
                alert('Database error: ' + event.target.errorCode);
            }
    
            request.onsuccess = function(event) {
                db = request.result;
                var postObjectStore = db.transaction(["post"], "readwrite");
                postObjectStore.oncomplete = function(event) {
                    console.log('done');
                }

                postObjectStore.onerror = function(event) {
                    console.log('fail');
                }

                var objectStore = postObjectStore.objectStore('post');
                var deleteRequest = objectStore.delete(key);
                deleteRequest.onsuccess = function(event) {
                    console.log("deleted");
                }      
            }
        }
    },
};

export default DBControler;
