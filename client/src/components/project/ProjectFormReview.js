import _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import projectFields from './projectFields';
import * as actions from '../../actions';

const ProjectFormReview = ({ onCancel, formValues, publishProject, history }) => {

    const reviewFields = _.map(projectFields, ({name, label}) => {
        return (
            <div key={name}>
                <label> {label} </label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5> Please confirm your entries. </h5>
            {reviewFields}
            <button className="yellow darken-3 btn-flat" onClick={onCancel}>
                Back
            </button>

            <button onClick={() => publishProject(formValues, history)} className="green white-text btn-flat right">
                Publish Project
            </button>
        </div>
    );
};

function mapStateToProps(state) {

    return {
        formValues: state.form.projectForm.values
    };
}

export default connect(mapStateToProps, actions)(withRouter(ProjectFormReview));