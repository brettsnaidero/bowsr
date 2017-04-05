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
                      <img src={logo} className="App-logo" alt="Bowser Icon" />
                    </div>
                    <div className="logo-text">
                      <img src={logoText} className="App-logo" alt="Bowser" />
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
                  <button className={'flip withicon ' + (this.props.mobileShow ? 'flip-map' : 'flip-list')} onClick={this.props.flipMobile}>
                    { this.props.mobileShow ? (
											<div>
												<svg viewBox="0 0 512.002 512.002">
														<path d="M72.434,97.054c-16.334,0-29.624,13.29-29.624,29.624c0,16.335,13.29,29.625,29.624,29.625s29.624-13.29,29.624-29.625
															C102.058,110.344,88.768,97.054,72.434,97.054z M72.434,134.991c-4.584,0-8.313-3.73-8.313-8.314s3.729-8.313,8.313-8.313
															c4.584,0,8.313,3.728,8.313,8.313S77.017,134.991,72.434,134.991z"/>
														<path d="M491.813,187.618v-75.237c0-14.565-11.853-26.43-26.432-26.447l-333.163-0.167c-2.603-3.786-5.579-7.359-8.926-10.66
															C109.384,61.39,90.973,53.966,71.409,54.255C32.267,54.797,0.234,87.091,0.001,126.241c-0.068,11.602,2.674,23.157,7.93,33.42
															c0.104,0.204,17.329,29.086,17.329,29.086v242.348c0,14.577,11.86,26.437,26.432,26.437l413.663,0.224
															c14.589,0,26.458-11.865,26.458-26.448V291.324c0,0,12.153-20.381,12.257-20.586c5.188-10.129,7.931-21.534,7.931-32.982
															C512,218.887,504.835,201.169,491.813,187.618z M418.955,107.222l-51.448,51.448l-51.5-51.5L418.955,107.222z M353.943,172.233
															l-89.665,89.665l-32.784-32.784c-0.002-0.002-0.003-0.003-0.005-0.005s-0.003-0.003-0.005-0.005l-24.592-24.592l89.665-89.664
															L353.943,172.233z M175.387,298.777l49.322-49.322l63.367,63.367l-49.322,49.322L175.387,298.777z M187.409,337.923
															l-55.327,55.326l-44.332-44.333l55.326-55.326L187.409,337.923z M136.932,159.661c5.188-10.129,7.931-21.534,7.931-32.982
															c0-6.725-0.928-13.298-2.686-19.596l134.953,0.068l-83.799,83.799l-30.007-30.007c-3.746-3.744-9.817-3.744-13.563,0
															c-3.745,3.745-3.745,9.818,0,13.564l61.386,61.386l-49.322,49.322l-39.946-39.946c-3.745-3.744-9.817-3.744-13.563,0
															c-3.745,3.746-3.745,9.818,0,13.564l21.196,21.196l-82.94,82.939V224.465l7.568,12.684c3.881,6.504,10.719,10.387,18.292,10.387
															s14.411-3.883,18.292-10.386C90.723,237.149,136.828,159.865,136.932,159.661z M26.75,149.652
															c-3.657-7.251-5.487-15.082-5.438-23.284c0.164-27.63,22.769-50.421,50.39-50.804c13.817-0.17,26.808,5.036,36.624,14.717
															c3.38,3.334,6.224,7.059,8.518,11.065c0.099,0.191,0.209,0.374,0.32,0.557c4.165,7.492,6.388,15.956,6.388,24.777
															c0,8.091-1.83,15.818-5.439,22.974L72.443,226.23L26.75,149.652z M51.698,436.221c-2.826,0-5.125-2.298-5.125-5.125v-41.002
															l27.614-27.614l73.793,73.794L51.698,436.221z M175.12,436.287l-29.476-29.476l55.327-55.326l84.861,84.862L175.12,436.287z
															 M252.317,375.706l49.322-49.322l35.816,35.816l-49.322,49.322L252.317,375.706z M312.972,436.362l-11.277-11.277l49.322-49.322
															l60.653,60.653L312.972,436.362z M465.361,436.444l-26.55-0.014l-74.23-74.23l22.341-22.341c3.746-3.746,3.746-9.818,0-13.564
															c-3.745-3.744-9.817-3.744-13.563,0l-22.342,22.342l-42.592-42.592c-0.002-0.002-0.003-0.003-0.005-0.005
															c-0.002-0.002-0.003-0.003-0.005-0.005l-30.573-30.574l36.354-36.354l18.838,18.838c2.081,2.08,4.808,3.121,7.535,3.121
															s5.455-1.041,7.535-3.121c4.161-4.161,4.161-10.908,0-15.071l-18.838-18.838l116.8-116.8l19.297,0.01
															c2.832,0.003,5.137,2.307,5.137,5.135v59.841c-9.847-4.663-20.706-7.058-31.956-6.888c-39.142,0.543-71.174,32.835-71.406,71.986
															c-0.068,11.602,2.674,23.157,7.93,33.42c0.104,0.203,46.209,77.488,46.209,77.488c3.881,6.504,10.719,10.387,18.293,10.387
															c7.573,0,14.411-3.882,18.291-10.386l12.64-21.185v104.265h0.003C470.501,434.14,468.192,436.444,465.361,436.444z M485.25,260.73
															l-13.449,22.55c-0.004,0.009-0.011,0.017-0.015,0.026l-32.207,54.001l-45.691-76.578c-3.657-7.251-5.487-15.082-5.438-23.284
															c0.163-27.63,22.769-50.42,50.391-50.803c13.79-0.188,26.807,5.035,36.622,14.716c9.818,9.683,15.226,22.61,15.226,36.399
															C490.689,245.848,488.859,253.575,485.25,260.73z"/>
														<path d="M439.571,208.133c-16.335,0-29.624,13.29-29.624,29.625c0,16.334,13.29,29.624,29.624,29.624
															c16.335,0,29.624-13.29,29.624-29.624C469.195,221.421,455.906,208.133,439.571,208.133z M439.571,246.069
															c-4.584,0-8.313-3.728-8.313-8.313s3.728-8.314,8.313-8.314s8.313,3.73,8.313,8.314S444.155,246.069,439.571,246.069z"/>
												</svg>
												<span>
													Map
												</span>
											</div>
                    ) : (
											<div>
												<svg viewBox="0 0 512 512">
														<path d="M498.723,89.435H183.171V76.958c0-18.3-14.888-33.188-33.188-33.188h-51.5c-18.3,0-33.188,14.888-33.188,33.188v12.477
															H13.275C5.943,89.435,0,95.38,0,102.711c0,7.331,5.943,13.275,13.275,13.275h52.018v12.473c0,18.3,14.888,33.188,33.188,33.188
															h51.501c18.3,0,33.188-14.888,33.188-33.188v-12.473h315.553c7.332,0,13.275-5.945,13.275-13.275
															C511.999,95.38,506.055,89.435,498.723,89.435z M156.621,128.459c0,3.66-2.978,6.638-6.638,6.638H98.482
															c-3.66,0-6.638-2.978-6.638-6.638V76.958c0-3.66,2.978-6.638,6.638-6.638h51.501c3.66,0,6.638,2.978,6.638,6.638V128.459z"/>
														<path d="M498.725,237.295h-52.019v-12.481c0-18.3-14.888-33.188-33.188-33.188h-51.501c-18.3,0-33.188,14.888-33.188,33.188
															v12.481H13.275C5.943,237.295,0,243.239,0,250.57c0,7.331,5.943,13.275,13.275,13.275h315.553v12.469
															c0,18.3,14.888,33.188,33.188,33.188h51.501c18.3,0,33.188-14.888,33.188-33.188v-12.469h52.019
															c7.332,0,13.275-5.945,13.275-13.275C512,243.239,506.057,237.295,498.725,237.295z M420.155,276.315
															c0,3.66-2.978,6.638-6.638,6.638h-51.501c-3.66,0-6.638-2.978-6.638-6.638v-51.501c0-3.66,2.978-6.638,6.638-6.638h51.501
															c3.66,0,6.638,2.978,6.638,6.638V276.315z"/>
														<path d="M498.725,396.014H276.432v-12.473c0-18.3-14.888-33.188-33.188-33.188h-51.501c-18.3,0-33.188,14.888-33.188,33.188
															v12.473H13.275C5.943,396.014,0,401.959,0,409.289c0,7.331,5.943,13.275,13.275,13.275h145.279v12.477
															c0,18.3,14.888,33.188,33.188,33.188h51.501c18.3,0,33.188-14.888,33.188-33.188v-12.477h222.293
															c7.332,0,13.275-5.945,13.275-13.275C512,401.957,506.057,396.014,498.725,396.014z M249.881,435.042
															c0,3.66-2.978,6.638-6.638,6.638h-51.501c-3.66,0-6.638-2.978-6.638-6.638v-51.501c0-3.66,2.978-6.638,6.638-6.638h51.501
															c3.66,0,6.638,2.978,6.638,6.638V435.042z"/>
												</svg>
												<span>
													List/Options
												</span>
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
