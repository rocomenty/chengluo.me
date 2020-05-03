import axios from 'axios';
import { FETCH_USER, FETCH_PROJECT } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchProject = () => async dispatch => {
    const res = await axios.get('/api/projects');
    dispatch({ type: FETCH_PROJECT, payload: res.data });
};

export const publishProject = (values, history) => async dispatch => {
    const res = await axios.post('/api/projects', values);

    history.push('/projects');
    dispatch({ type: FETCH_USER, payload: res.data });
};