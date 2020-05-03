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
                        {this.state.showLoginPop ? <li><Popup toggle={this.togglePop} /></li> : null}
                    </div>
                );
            default:
                return (
                    [
                    <li key="1"><a href='/api/logout'> Log Out </a></li>,
                    <li key="2"><Link to='/projects'> Projects </Link></li>,
                    ]
                );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to='/'
                        className="left brand-logo"
                    >
                        chengluo.me
                    </Link>
                    <ul className="right">
                        <li><Link to='/about-me'> About Me </Link></li>
                        <li><Link to='/as-a-developer'> As a Developer </Link></li>
                        <li><Link to='/as-a-photographer'> As a Photographer </Link></li>
                        <li><Link to='/as-a-poet'> As a Poet </Link></li>
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