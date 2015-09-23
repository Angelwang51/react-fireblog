import React from 'react';
import { Link } from 'react-router';
import Firebase from 'firebase';

var Header = React.createClass({
  displayMenu: function(){
    //change getElementByClassName to getElementById because 
    //getElementsByClassName returns an array of elements (hence "elements").
    //when we use getElementsByClassName we should specify the item in arra
      var e = document.getElementById('menu-fullscreen');
      if(e.style.display == 'block' || e.style.display ==''){
      e.style.display = 'none';
      }else{e.style.display='block'};
      e.onclick = function(){
        document.getElementById('menu-fullscreen').style.display = 'none';
      };
    
  },
  displayPost: function(){
    var ref = new Firebase("https://react-fireblog.firebaseio.com");
    var authData = ref.getAuth();
    if(authData && authData.uid=='twitter:346544377'){
      return (
        <div className='menu-fullscreen-item'>
          <Link to="post">Post</Link>
        </div>
    )}else{
      return null
    };
  },
  displaySignIn: function(){
    var ref = new Firebase("https://react-fireblog.firebaseio.com");
    var authData = ref.getAuth();
    if(authData){
      return null
    }else{
      return(<div className="menu-fullscreen-item">
              <a onClick={this.handleSignIn}>Sign In</a>
            </div>
    )
    };
  },
  displaySignOut: function(){
    var ref = new Firebase("https://react-fireblog.firebaseio.com");
    var authData = ref.getAuth();
    if(authData){
    return(<div className="menu-fullscreen-item">
              <a onClick={this.handleSignOut}>Sign Out</a>
            </div>
    )}else{
      return null
    };
  },
  reloadPage: function(){
      location.reload();
  },
  handleSignIn: function(){
      var ref = new Firebase("https://react-fireblog.firebaseio.com");
      ref.authWithOAuthPopup("twitter", function(error, authData) {
          if (error) {
          console.log("Login Failed!", error);
          } else {
            
          console.log("Authenticated successfully with payload:", authData);
          }
      });
  },
  handleSignOut: function(){
    var ref = new Firebase("https://react-fireblog.firebaseio.com");
    ref.unauth();
    //reload after sign out
    
    alert('you have been loged out');
  },
  /*
  closeBrowserSignOut: function(){
    var ref = new Firebase("https://react-fireblog.firebaseio.com");
    ref.unauth();
  },
  window.onunload = closeBrowserSignOut(),*/
  render: function() {
  
    return (
      <div>
      <header id="headerId">
        <div onClick={this.displayMenu} className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
    {/*put fullscreen menu out of header block to solve the problem of cannot cover grids*/}
      <div id="menu-fullscreen">
          <div className="menu-fullscreen-list">
            <div className="menu-fullscreen-item">
              <Link to="home">Home</Link>
            </div>
            <div className="menu-fullscreen-item">
              <Link to="info">About</Link>
            </div>
            {this.displaySignIn()}
            {this.displaySignOut()}  
            {this.displayPost()}
          </div>
      </div>
      </div>
    );
  }

})

Header.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default Header;