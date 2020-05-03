import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import ProjectList from './project/ProjectList';
import ProjectNew from './project/ProjectNew';
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
                        <Route exact path="/projects" component={ProjectList} />
                        <Route exact path="/project/new" component={ProjectNew} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
};

export default connect(null, actions)(App);