import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
// import ProjectNew from './surveys/SurveyNew';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
};

export default connect(null, actions)(App);