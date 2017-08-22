import React from 'react';
import PropTypes from 'prop-types';
import Issue from 'open-issue';

const Error = ({ repository }) => {
    const issue = new Issue()
      // A Github issue
      .provider('github')
      // For a specify repository
      .repository('niktekusho/travis-builds-reporter-web')
      // With a nice title
      .title('Unexpected error showing builds')
      // And some labels
      .labels('bug', 'fatal')
      // Assign a poor developer
      .assign('niktekusho')
      // Append some text
      .append('Collected info:')
      .append(`Repository searched for: ${repository}`)
      // More text
      .append('If you want, leave below additional info. :)');

    // Generate the final url
    const issueUrl = issue.url();

    return (
      <div className="error">
        <img src={require("./assets/error.jpg")} alt="Sad bird" width={200}/>
        <p>
          We failed to retrieve builds from Travis. Please check the spelling of the repository.
          If that does not help, open a new <a className="github-btn" href={issueUrl}>issue on github</a>
        </p>
      </div>
    )
};

Error.propTypes = {
    repository: PropTypes.string.isRequired,
};

export default Error;
