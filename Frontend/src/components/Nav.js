import React from 'react';
import SearchWidget from './Searchwidget';

const Nav = () => {
    return (<div class="row">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div class="col-md-3">
            <a class="navbar-brand" href="#"><h2>Blog<b>AF</b></h2></a></div>
            
            <div class= "col-md-6"><SearchWidget/></div>
            <div class="col-md-3">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
               
                <li class="nav-item">
                  <span class="badge text-bg-secondary"><a class="nav-link" href="#">Login</a></span>
                </li>
                <li class="nav-item">
                  <span class="badge text-bg-secondary"><a class="nav-link" href="#">SignUp</a></span>
                </li>
              </ul>
            </div>
            </div>
          
        </nav></div>  );
}
 
export default Nav;