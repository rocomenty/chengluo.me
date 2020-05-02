import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Popup from './Popup';

class Header extends Component {
    state = {
        showLoginPop: false
    }

    togglePop = () => {
        this.setState({
            showLoginPop: !this.state.showLoginPop
        })
    }

    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <div>
                        <li>
                            <button onClick={this.togglePop}> Login </button>
                        </li>
                        {this.state.showLoginPop ? <Popup toggle={this.togglePop} /> : null}
                    </div>
                );
            default:
                return (
                    [
                    <li key="1"><a href='/api/logout'> Log Out </a></li>
                    ]
                );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        chengluo.me
                    </Link>
                    <ul className="right">
                        { this.renderContent() }
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);