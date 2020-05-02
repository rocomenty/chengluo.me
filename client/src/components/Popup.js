import React, { Component } from 'react';
import { connect } from 'react-redux';

class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div>
        <li>
            <a href="/auth/google"> <img src={process.env.PUBLIC_URL + '/google_signin_buttons/2x/btn_google_signin_dark_normal_web@2x.png'} /> </a>
            <a href="/auth/facebook"> Login with Facebook </a>
        </li>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(PopUp);