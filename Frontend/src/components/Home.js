import React ,{useState,useEffect} from 'react';

import axios from 'axios';
import '../css/Home.css'
import Nav from './Nav';
import Blogpost from './Blogpost';
import Footer from './Footer';
import SideWidget from './Sidewidget';
import SearchWidget from './Searchwidget';
import CategoryWidget from './Categorywidget';

import Sidebar from './Sidebar';

  


function Home() {
  const [blogs ,setBlogs] = useState([]); 
  
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/getData/getBlog',
      responseType: 'json'
    })
    .then(function (response) {
      // handle success
      
      setBlogs(response.data);
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    ;
    
  },[]);
  
console.log(blogs)
  
    return ( <div>
      {/* // Navigation --> */}
      
       {/* <!-- Page Content --> */}
      <div class="container-fluid">
      <Nav/>
        <div class="row">
        <div class="col-3" style={{textAlign:"right"}}>
    
    {/* <!-- Search Widget --> */}
  <CategoryWidget/>
    {/* <!-- Categories Widget --> */}
    <Sidebar/>

    {/* <!-- Side Widget --> */}
    

  </div>
    
          {/* <!-- Blog Entries Column --> */}
          <div class="col-6" style={{}}>
    
            <h4 class="my-4 textwhite"> 
              {/* <small>Secondary Text</small> */}
            </h4>


            {/* <!-- Blog Post --> */}
           <Blogpost props={blogs}/>
            {/* <!-- Blog Post --> */}
            
            {/* <!-- Pagination --> */}
            
    
          </div>
          <div class="col-3">

          </div>
    
          {/* <!-- Sidebar Widgets Column --> */}
          
    
        </div>
        {/* <!-- /.row --> */}
    
      </div>
      {/* <!-- /.container --> */}
    
      {/* <!-- Footer --> */}
      <Footer/> </div> );
  }

 
export default Home ;


