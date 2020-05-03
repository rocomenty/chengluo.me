import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProject } from '../../actions';
import { Link } from 'react-router-dom';

class ProjectList extends Component {

    componentDidMount() {
        this.props.fetchProject();
    }

    renderProjects() {
        return this.props.project.reverse().map(project => {
            return (
                <div className="dark-1 card" key={project._id}>
                    <div className='card-content'>
                        <span className="card-title">{project.title}</span>
                        <p>
                            {project.content}
                        </p>
                        <p className="right">
                            Sent On: {new Date(project.pubTime).toLocaleDateString()}
                        </p>

                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <Link to="/project/new" className="btn-floating btn-large red">
                    <i className="material-icons"> Add New </i>
                </Link>
                {this.renderProjects()}
            </div>

        );
    }
}

function mapStateToProps({ project }) {
    return { project };
}

export default connect(mapStateToProps, {fetchProject})(ProjectList);