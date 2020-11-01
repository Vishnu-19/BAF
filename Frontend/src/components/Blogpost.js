import { use } from 'passport';
import React,{useEffect, useState} from 'react';
import dateformat from 'dateformat';

const Blogpost = props => {
  const [temp,setTemp]=useState(3);
  var [posts,setPosts]=useState([]);
  var length=props.props.length;
  console.log(temp,posts)
  function newer() {
    var Posts=[];
    console.log(temp)
    if(temp<=length||temp===0){
    Posts= props.props.slice(temp,temp+3);
    setTemp(temp+3);
    setPosts(Posts);
    }
    
  }
    function older(){
   var Posts=[];
      if(temp>3){
        
      Posts=props.props.slice(temp-6,temp-3);
      setTemp(temp-3);
      setPosts(Posts);
    }
    else{
      console.log("Shit Happens!")
    }

  }

function arrayBufferToBase64 (buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};
  
 
  const content =(temp<=3? props.props.slice(0,3):posts).map((item) =>{    
    var img= 'data:image/png;base64,' + arrayBufferToBase64(item.img.data.data);
    return(
  <div class="card mb-4">
    <img class="card-img-top" src={img} style={{'height':'250px'}} alt="Card image cap"/>
    <div class="card-body">
      <h2 class="card-title">{item.title}</h2>
<p>{props.title}</p>
    <p class="card-text">{item.content}</p>
      <a href="#" class="btn btn-primary">Read More &rarr;</a>
    </div>
    <div class="card-footer text-muted">
      Posted on {dateformat(item.date,'longDate')}
      <a href="#" style={{'padding':'5px'}}>{item.category}</a>
    </div>
  </div>)}
);

    return (<div>{content}
    <ul class="pagination justify-content-center mb-4">
              <li  class={temp>length?'page-item disabled':'page-item'}>
                <button class="page-link" onClick={newer} >&larr; Older</button>
              </li>
              <li  class={temp<=3?'page-item disabled':'page-item'}>
                <button onClick={older}  class="page-link"  >Newer &rarr;</button>
              </li>
            </ul>
    </div>
);
}
 
export default Blogpost;