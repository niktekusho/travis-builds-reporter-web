import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

import { GoMarkGithub, GoRepo } from 'react-icons/lib/go';
import { FaLinkedinSquare } from 'react-icons/lib/fa';

import NpmIcon from './NpmIcon';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        frontendVersion: '',
        backendVersion: '',
        rootVersion: '',
        coreVersion: '',
        utilsVersion: '',
      },
    }
  }

  componentDidMount() {
    fetch('/versions', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then((data) => {
        this.setState({
          project: {
            frontendVersion: data.frontendVersion,
            backendVersion: data.backendVersion,
            rootVersion: data.rootVersion,
            coreVersion: data.coreVersion,
            utilsVersion: data.utilsVersion,
          },
        });
    });
  }

  richLink = (url, tooltip, style, iconStyle, child) => {
    return (
      <a href={url}>
        <IconButton tooltip={tooltip} touch={true} tooltipPosition="top-center" style={style} iconStyle={iconStyle}>
          {child}
        </IconButton>
      </a>
    );
  };

  render() {
    const { project } = this.state;

    const styles = {
      smallIcon: {
        width: 24,
        height: 24,
      },
      largeIcon: {
        width: 60,
        height: 60,
      },
      small: {
        width: 64,
        height: 64,
        padding: 16,
      },
      large: {
        width: 120,
        height: 120,
      },
    };

    function formatVersion(version) {
        return version.replace(/[^\d.]/, '');
    }

    return (
      <div>
        <h2>About</h2>
        <div>
          <h3>Author</h3>
          <div className="lot-of-text-container">
            My name is Nicola Dal Maso. I'm currently a student of the Computer Science degree course
            at the University of Padua (Italy) and I work at Sanmarco Informatica.
            Below you can find some useful links about me and/or about this project:
            <List>
              <ListItem>
                {this.richLink('https://github.com/niktekusho', 'my GitHub account', styles.large, styles.largeIcon, <GoMarkGithub />)}
              </ListItem>
              <ListItem>
                {this.richLink('https://www.linkedin.com/in/nicoladalmaso', 'my Linkedin account', styles.large, styles.largeIcon, <FaLinkedinSquare />)}
              </ListItem>
            </List>
          </div>
        </div>
        <div className="lot-of-text-container">
          <h3>Project description</h3>
          <p>
            I created this tool for the didactic project of the Software Engineering course at the
            University of Padua.
            Initially available only as a CLI software (<a
            href="https://www.npmjs.com/package/travis-builds-reporter-cli">npm registry</a>),
            me and my teammates used it to measure <span className="pretty-span">our development processes quality</span>:
            we measured the quality of our iteration cycles (Incremental Process model lifecycle)
            during the development of the <a href="https://github.com/or-bit/monolith">monolith
            framework</a>.
            You can find this project's source code following the link below:
            <div>
              {this.richLink('https://github.com/niktekusho/travis-builds-reporter-web', 'this project repository', styles.large, styles.largeIcon, <GoMarkGithub />)}
            </div>
          </p>
        </div>
        <div>
          <h3>Project's details:</h3>
          <Table>
            <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
              <TableHeaderColumn>Package</TableHeaderColumn>
              <TableHeaderColumn>Version</TableHeaderColumn>
              <TableHeaderColumn>Link(s)</TableHeaderColumn>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>travis-builds-reporter-web</TableRowColumn>
                <TableRowColumn>{formatVersion(project.rootVersion)}</TableRowColumn>
                <TableRowColumn>
                  {this.richLink('https://github.com/niktekusho/travis-builds-reporter-web', 'GitHub', styles.small, styles.smallIcon, <GoRepo />)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>travis-builds-reporter-web:frontend</TableRowColumn>
                <TableRowColumn>{formatVersion(project.frontendVersion)}</TableRowColumn>
                <TableRowColumn>
                  {this.richLink('https://github.com/niktekusho/travis-builds-reporter-web/tree/master/client', 'GitHub', styles.small, styles.smallIcon, <GoRepo />)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>travis-builds-reporter-web:backend</TableRowColumn>
                <TableRowColumn>{formatVersion(project.backendVersion)}</TableRowColumn>
                <TableRowColumn>
                  {this.richLink('https://github.com/niktekusho/travis-builds-reporter-web/tree/master/server', '', styles.small, styles.smallIcon, <GoRepo />)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>travis-builds-reporter-core</TableRowColumn>
                <TableRowColumn>{formatVersion(project.coreVersion)}</TableRowColumn>
                <TableRowColumn>
                  {this.richLink('https://github.com/niktekusho/travis-builds-reporter/tree/master/packages/travis-builds-reporter-core', '', styles.small, styles.smallIcon, <GoRepo />)}
                  {this.richLink('https://www.npmjs.com/package/travis-builds-reporter-core', '', styles.small, styles.smallIcon, <NpmIcon />)}
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>travis-builds-reporter-utils</TableRowColumn>
                <TableRowColumn>{formatVersion(project.utilsVersion)}</TableRowColumn>
                <TableRowColumn>
                  {this.richLink('https://github.com/niktekusho/travis-builds-reporter/tree/master/packages/travis-builds-reporter-utils', '', styles.small, styles.smallIcon, <GoRepo />)}
                  {this.richLink('https://www.npmjs.com/package/travis-builds-reporter-utils', '', styles.small, styles.smallIcon, <NpmIcon />)}
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default About;
