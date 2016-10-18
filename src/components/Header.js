import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import logo from '../images/logo.svg';

import Modal from 'react-modal';

import logo from '../images/bowser.svg';
import logoText from '../images/bowsertext.svg';

import auth from '../auth';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// auth.onAuthStateChanged(user => {
//   if (user) {
//     // User is signed in.
//     this.setState({
//       user: true
//     });
//   } else {
//     // No user is signed in.
//     this.setState({
//       user: false
//     })
//   }
// });

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            txt: 'Bowsr',
            modalIsOpen: false,
            user: false
        }
    }

    renderLoggedInButtons() {
      return (
        <div>
          <button
            onClick={() => this.logOut()}
          >Log Out</button>
          {/* <button>Edit Profile</button> */}
        </div>
      )
    }

    renderLoggedOutButtons() {
      return (
        <div>
          <button
            onClick={() => this.openModal()}
          >
            Log In / Sign Up
          </button>
        </div>
      )
    }

    logIn() {
      let email = this.refs.email;
      let password = this.refs.password;

      auth.signInWithEmailAndPassword(email.value, password.value).then(() => {
		  this.setState({
			  user: true
		  });
		  // Close modal
		  this.closeModal();
	  }).catch(error => {
		  console.log("Error code", error.code, "Error message", error.message);
	  });

      email.value = '';
      password.value = '';
    }

    signUp() {
      let email = this.refs.email;
      let password = this.refs.password;

      auth.createUserWithEmailAndPassword(email.value, password.value).then(() => {
		  this.setState({
			  user: true
		  });
		  // Close modal
		  this.closeModal();
	  }).catch(error => {
		  console.log("Error code", error.code, "Error message", error.message);
	  });
    }

    logOut() {
		auth.signOut().then(() => {
			// Sign-out successful.
			this.setState({
				user: false
			});
		}).catch(error => {
			console.log("Error signing out!");
		});
    }

    renderSignUpForm() {
      return (
        <div>
          Email: <input type="email" ref="email" />
          Password: <input type="password" ref="password" />
          <button
            onClick={() => this.logIn()}
          >
            Log In
          </button>

          <button
            onClick={() => this.signUp()}
          >
            Sign Up
          </button>
        </div>
      )
    }

    render() {
        return (
            <header>
                <div className="logo">
                    <div className="logo-icon">
                      <img src={logo} className="App-logo" alt="Bowser Icon" />
                    </div>
                    <div className="logo-text">
                      <img src={logoText} className="App-logo" alt="Bowser" />
                    </div>
                </div>
                <div className="user">
                  { this.state.user ? this.renderLoggedInButtons() : this.renderLoggedOutButtons()}
                </div>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal()}
                  // onRequestClose={requestCloseFn}
                  // closeTimeoutMS={n}
                  // shouldCloseOnOverlayClick={false}
                  style={customStyles}
                  contentLabel="No Overlay Click Modal"
                >
                  { this.renderSignUpForm() }
                  <button
                    onClick={() => this.closeModal()}
                  >
                    Close Modal
                  </button>
                </Modal>
            </header>
        )
    }

    // Modal
    openModal() {
      this.setState({
        modalIsOpen: true
      });
    }

    afterOpenModal() {
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }
}
