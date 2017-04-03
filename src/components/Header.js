import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import logo from '../images/logo.svg';

import Modal from 'react-modal';

import logo from '../images/bowser.svg';
import logoText from '../images/bowsertext.svg';

import auth from '../auth';

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

    logIn(e) {
        e.preventDefault();
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
            this.setState({
                errorMessage: error.message
            })
        });

        email.value = '';
        password.value = '';
    }

    signUp(e) {
        e.preventDefault();

        let email = this.refs.email;
        let password = this.refs.password;

        auth.createUserWithEmailAndPassword(email.value, password.value).then(() => {
            this.setState({
                user: true
            });
            // Close modal
            this.closeModal();
        }).catch(error => {
            this.setState({
                errorMessage: error.message
            })
        });
    }

    logOut() {
        auth.signOut().then(() => {
            // Sign-out successful.
            this.setState({
                user: false
            });
        }).catch(error => {
            this.setState({
                errorMessage: error.message
            })
        });
    }

    renderEditProfile() {
      return (
        <div className="popup-holder">
            <div className="popup-content">
              <button className="close" onClick={() => this.closeModal()}>close</button>
              <form>
                { this.state.errorMessage ? `<div class="message bad">${this.state.errorMessage}</div>` : `` }
                <div className="field text">
                  <label>Preferred Fuel Type:</label>
                  <input type="text" ref="fueltype" />
                </div>
                <div className="Actions">
                  <button onClick={ this.logIn.bind(this)}>
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
        </div>
      )
    }

    renderSignUpForm() {
      return (
        <div className="popup-holder">
            <div className="popup-content">
              <button className="close" onClick={() => this.closeModal()}>close</button>
              <form>
                { this.state.errorMessage ? `<div class="message bad">${this.state.errorMessage}</div>` : `` }
                <div className="field text">
                  <label>Email:</label>
                  <input type="email" ref="email" />
                </div>
                <div className="field text">
                  <label>Password:</label>
                  <input type="password" ref="password" />
                </div>
                <div className="Actions">
                  <button onClick={ this.logIn.bind(this)}>
                    Log In
                  </button>
                  <button onClick={this.signUp.bind(this)}>
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
        </div>
      )
    }

    renderAbout() {
      return (
        <div className="popup-holder">
            <div className="popup-content">
              <button className="close" onClick={() => this.closeModal()}>close</button>
              <h2>About</h2>
              <p></p>
            </div>
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
                  <button
                    className="about"
                    onClick={() => this.openModal()}
                  >
                    About Bowser
                  </button>
                  <button className={'flip ' + (this.props.mobileShow ? 'flip-map' : 'flip-list')} onClick={this.props.flipMobile}>
                    { this.props.mobileShow ? (
                      <div>
                        Show Map
                      </div>
                    ) : (
                      <div>
                        Show List
                      </div>
                    ) }
                  </button>
                </div>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal()}
                  shouldCloseOnOverlayClick={true}
                  contentLabel="No Overlay Click Modal"
                  className="modal"
                  overlayClassName="modal-overlay"
                >
                  { this.renderAbout() }
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
      this.setState({
        modalIsOpen: false,
        errorMessage: null
      });
    }
}
