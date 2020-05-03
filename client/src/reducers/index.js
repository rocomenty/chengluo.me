import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import projectReducer from './projectReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    project: projectReducer
});