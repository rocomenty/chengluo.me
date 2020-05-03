import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import ProjectForm from './ProjectForm';
import ProjectFormReview from './ProjectFormReview';

class ProjectNew extends Component {

    // constructor(props) {
    //     super(props);

    //     this.state = { new: true };
    // }

    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return (<ProjectFormReview onCancel={() => this.setState({ showFormReview: false })}/>);
        }

        return (<ProjectForm onProjectSubmit={() => this.setState({ showFormReview: true })}/>);
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'projectForm'
})(ProjectNew);