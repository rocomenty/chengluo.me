import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import ProjectField from './ProjectField';
import projectFields from './projectFields';

class ProjectForm extends Component {
    renderFields() {
        return _.map(projectFields, ({ label, name }) => {
            return <Field key={name} component={ProjectField} type="text" label={label} name={name} />;
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onProjectSubmit)}>
                    {this.renderFields()}
                    <Link to="/projects" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    // errors.recipients = validateEmails(values.recipients || "");

    // _.each(formFields, ({ name }) => {
    //     if (!values[name]) {
    //         errors[name] = 'You must provide a value';
    //     }
    // });

    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'projectForm',
    destroyOnUnmount: false
})(ProjectForm);