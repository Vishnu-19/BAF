import React ,{useState,useEffect} from 'react';

import axios from 'axios';
import './Home.css'
import Nav from './Nav';
import Blogpost from './Blogpost';
import Footer from './Footer';
import SideWidget from './Sidewidget';
import SearchWidget from './Searchwidget';
import CategoryWidget from './Categorywidget';


  


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
      <Nav/>
       {/* <!-- Page Content --> */}
      <div class="container">
    
        <div class="row">
    
          {/* <!-- Blog Entries Column --> */}
          <div class="col-md-8">
    
            <h1 class="my-4">Latest Updates
              {/* <small>Secondary Text</small> */}
            </h1>

{console.log(blogs)}
            {/* <!-- Blog Post --> */}
           <Blogpost props={blogs}/>
            {/* <!-- Blog Post --> */}
            
            {/* <!-- Pagination --> */}
            
    
          </div>
    
          {/* <!-- Sidebar Widgets Column --> */}
          <div class="col-md-4">
    
            {/* <!-- Search Widget --> */}
            <SearchWidget/>
            {/* <!-- Categories Widget --> */}
            <CategoryWidget/>
    
            {/* <!-- Side Widget --> */}
            <SideWidget/>
    
          </div>
    
        </div>
        {/* <!-- /.row --> */}
    
      </div>
      {/* <!-- /.container --> */}
    
      {/* <!-- Footer --> */}
      <Footer/> </div> );
  }

 
export default Home ;


