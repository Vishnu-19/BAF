import React from 'react';

const Blogpost = (props) => {
  
  
function arrayBufferToBase64 (buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};
  
 
  const content = props.props.map((item) =>{    
    var img= 'data:image/png;base64,' + arrayBufferToBase64(item.img.data.data);
    return(
  <div class="card mb-4">
    <img class="card-img-top" src={img} style={{'width':'750px','height':'200px'}} alt="Card image cap"/>
    <div class="card-body">
      <h2 class="card-title">{item.title}</h2>
<p>{props.title}</p>
    <p class="card-text">{item.content}</p>
      <a href="#" class="btn btn-primary">Read More &rarr;</a>
    </div>
    <div class="card-footer text-muted">
      Posted on {item.date}
      <a href="#">{item.category}</a>
    </div>
  </div>)}
);

    return (<div>{content}
    <ul class="pagination justify-content-center mb-4">
              <li class="page-item">
                <a class="page-link" href="#">&larr; Older</a>
              </li>
              <li class="page-item disabled">
                <a class="page-link" href="#">Newer &rarr;</a>
              </li>
            </ul>
    </div>
);
}
 
export default Blogpost;