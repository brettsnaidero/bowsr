import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import logo from '../images/logo.svg';

import Modal from 'react-modal';

import logo from '../images/bowser.svg';
import logoText from '../images/bowsertext.svg';
import logoTextMobile from '../images/bowsertext-mobile.svg';

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
              <p>This tool will help find the cheapest fuel, whether in your local area or in any suburb or town in New South Wales, and it will search for the closest and cheapest offering of any particular fuel type, for example E10, Premium or Diesel.</p>
              <p></p>
              <h2>Credit</h2>
              <p>Site built by <a href="http://brettsnaidero.com" title="">Brett Snaidero</a>. Using the FuelCheck API provided by OneGov to find petrol prices.</p>
            </div>
        </div>
      )
    }

    render() {
        return (
            <header>
                <div className="logo">
                    <div className="logo-icon">
                      <img src={logo} className="App-logo" alt="ServoScanner Icon" />
                    </div>
                    <div className="logo-text">
                      <img src={logoText} className="App-logo" alt="ServoScanner" />
                    </div>
                    <div className="logo-textmobile">
                      <img src={logoTextMobile} className="App-logo" alt="ServoScanner" />
                    </div>
                </div>
                <div className="user">
                  <button
                    className="about withicon"
                    onClick={() => this.openModal()}
                  >
										<div>
											<svg viewBox="0 0 475 475">
												<path d="M238,0C107,0,0,107,0,238s107,237,238,237s237-106,237-237S369,0,238,0z M238,432
													c-107,0-194-87-194-194S131,44,238,44s194,87,194,194S345,432,238,432z"/>
												<path d="M270,323l-20,9l26-133c3-14-12-29-28-20l-49,27c-9,5-12,17-7,26s17,12,26,7l12-6l-25,127
													c-2,11,7,23,19,23c3,0,6-1,8-2l53-23c10-4,14-15,10-25S280,319,270,323z"/>
												<path d="M257,143c15,0,27-12,27-27s-12-27-27-27s-27,12-27,27S242,143,257,143z"/>
											</svg>
											<span>About</span>
										</div>
                  </button>
                  <button className={'flip withicon ' + (this.props.mobileShow ? 'active' : 'inactive')} onClick={() => this.props.changeMobile(true)}>
											<div>
                        <svg viewBox="0 0 500 500">
                          <path d="M36,387c-19,0-36,16-36,35s17,36,36,36s35-17,35-36S55,387,36,387z"/>
                          <path d="M36,215c-19,0-36,16-36,35s17,35,36,35s35-16,35-35S55,215,36,215z"/>
                          <path d="M164,110h303c18,0,33-14,33-32s-15-33-33-33H164c-18,0-33,15-33,33S146,110,164,110z"/>
                          <path d="M36,42C17,42,0,59,0,78s17,35,36,35s35-16,35-35S55,42,36,42z"/>
                          <path d="M467,217H164c-18,0-33,15-33,33s15,33,33,33h303c18,0,33-15,33-33S485,217,467,217z"/>
                          <path d="M467,389H164c-18,0-33,15-33,33s15,33,33,33h303c18,0,33-15,33-33S485,389,467,389z"/>
                        </svg>
												<span>
													List
												</span>
											</div>
                  </button>
                  <button className={'flip withicon ' + (this.props.mobileShow ? 'inactive' : 'active')} onClick={() => this.props.changeMobile(false)}>
											<div>
                        <svg viewBox="0 0 487.724 487.724">
                          <path d="M236.925,0.124c-96.9,3.4-177.4,79-186.7,175.5c-1.9,19.3-0.8,38,2.6,55.9l0,0c0,0,0.3,2.1,1.3,6.1
      c3,13.4,7.5,26.4,13.1,38.6c19.5,46.2,64.6,123.5,165.8,207.6c6.2,5.2,15.3,5.2,21.6,0c101.2-84,146.3-161.3,165.9-207.7
      c5.7-12.2,10.1-25.1,13.1-38.6c0.9-3.9,1.3-6.1,1.3-6.1l0,0c2.3-12,3.5-24.3,3.5-36.9C438.425,84.724,347.525-3.776,236.925,0.124
      z M243.825,291.324c-52.2,0-94.5-42.3-94.5-94.5s42.3-94.5,94.5-94.5s94.5,42.3,94.5,94.5S296.025,291.324,243.825,291.324z"/>
                        </svg>
												<span>
													Map
												</span>
											</div>
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
