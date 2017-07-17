import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const RepositoryForm = ({ repositoryError, repositoryAuthorError, repositoryAuthorChanged, repositoryChanged, submit }) => {
  return (
    <div>
      <div>
        <TextField
          floatingLabelText="Repository author"
          onChange={event => repositoryAuthorChanged(event)}
          errorText={repositoryAuthorError}
        />
        /
        <TextField
          floatingLabelText="Repository name"
          onChange={event => repositoryChanged(event)}
          errorText={repositoryError}
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
  repositoryError: PropTypes.string,
  repositoryAuthorError: PropTypes.string,
};

RepositoryForm.defaultProps = {
  errors:  [],
};

export default RepositoryForm;