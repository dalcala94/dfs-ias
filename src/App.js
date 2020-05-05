import React, {Component} from 'react';
import fire from './fire';
import UploadPage from './pages/upload.js';
import DisplayPage from './pages/display.js';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = { 
  //     username: '',
  //     password: ''
  //   }
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // handleChange(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const usersRef = fire.database().ref('Users');
  //   const user = {
  //     user: this.state.username,
  //     password: this.state.password
  //   }
  //   usersRef.push(user);
  //   this.setState({
  //     username: '',
  //     password: ''
  //   });
  // }

  // render() {
  //   return (
  //     <div className='app'>
  //       <header>
  //           <div className='wrapper'>
  //             <h1>Adding Users</h1>
              
  //           </div>
  //       </header>
  //       <div className='container'>
  //         <section className='add-user'>
  //             <form onSubmit={this.handleSubmit}>
  //               <input type="text" name="username" placeholder="Enter a username" onChange={this.handleChange} value={this.state.username} />
  //               <input type="text" name="password" placeholder="Enter a password" onChange={this.handleChange} value={this.state.password} />
  //               <button>Add User</button>
  //             </form>
  //         </section>
  //         <section className='display-item'>
  //           <div className='wrapper'>
  //             <ul>
  //             </ul>
  //           </div>
  //         </section>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            {/* UploadRosterPage Component */}
            <Route path="/upload" component={UploadPage} />
          </Switch>
          <Switch>
            {/*DisplayRosterPage Component */}
            <Route path="/display" component={DisplayPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
