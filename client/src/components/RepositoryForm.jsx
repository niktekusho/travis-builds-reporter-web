import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const RepositoryForm = ({ repositoryAuthorChanged, repositoryChanged, submit }) => {
  return (
    <div>
      <div>
        <TextField
          floatingLabelText="Repository user's name"
          onChange={event => repositoryAuthorChanged(event)}
        />
        /
        <TextField
          floatingLabelText="Repository name"
          onChange={event => repositoryChanged(event)}
        />
      </div>
      <RaisedButton primary={true} onClick={() => submit()} label="Fetch"/>
    </div>
  )
};

RepositoryForm.propTypes = {
  repositoryAuthorChanged: PropTypes.func.isRequired,
  repositoryChanged: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default RepositoryForm;