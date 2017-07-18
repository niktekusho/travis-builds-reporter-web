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

  render() {
    const { project } = this.state;

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
                <a href="https://github.com/niktekusho">my GitHub account</a>
              </ListItem>
              <ListItem>
                <a href="">my LinkedIn page</a>
              </ListItem>
              <ListItem>
                <a href="https://github.com/niktekusho/travis-builds-reporter-web">this project
                  repository</a>
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
                <TableRowColumn>{project.rootVersion}</TableRowColumn>
                <TableRowColumn><a href="https://github.com/niktekusho/travis-builds-reporter-web">GitHub</a></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>travis-builds-reporter-web:frontend</TableRowColumn>
                <TableRowColumn>{project.frontendVersion}</TableRowColumn>
                <TableRowColumn><a
                  href="https://github.com/niktekusho/travis-builds-reporter-web/tree/master/client">GitHub</a></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>travis-builds-reporter-web:backend</TableRowColumn>
                <TableRowColumn>{project.backendVersion}</TableRowColumn>
                <TableRowColumn><a
                  href="https://github.com/niktekusho/travis-builds-reporter-web/tree/master/server">GitHub</a></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>travis-builds-reporter-core</TableRowColumn>
                <TableRowColumn>{project.coreVersion}</TableRowColumn>
                <TableRowColumn><a href="https://www.npmjs.com/package/travis-builds-reporter-core">npm
                  registry</a></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>travis-builds-reporter-utils</TableRowColumn>
                <TableRowColumn>{project.utilsVersion}</TableRowColumn>
                <TableRowColumn><a href="https://www.npmjs.com/package/travis-builds-reporter-utils">npm
                  registry</a></TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default About;
