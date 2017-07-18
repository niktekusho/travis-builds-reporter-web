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

const About = () => (
  <div>
    <h2>About</h2>
    <div>
      <h3>Author</h3>
      <div className="lot-of-text-container">
        My name is Nicola Dal Maso. I'm currently a student of the Computer Science degree course at the University of Padua (Italy) and I work at Sanmarco Informatica.
        Below you can find some useful links about me and/or about this project:
        <List>
          <ListItem>
            <a href="https://github.com/niktekusho">my GitHub account</a>
          </ListItem>
          <ListItem>
            <a href="">my LinkedIn page</a>
          </ListItem>
          <ListItem>
            <a href="https://github.com/niktekusho/travis-builds-reporter-web">this project repository</a>
          </ListItem>
        </List>
      </div>
    </div>
    <div className="lot-of-text-container">
      <h3>Project description</h3>
      <p>
        I created this tool for the didactic project of the Software Engineering course at the University of Padua.
        Initially available only as a CLI software (<a href="https://www.npmjs.com/package/travis-builds-reporter-cli">npm registry</a>),
        me and my teammates used it to measure <span className="pretty-span">our development processes quality</span>:
        we measured the quality of our iteration cycles (Incremental Process model lifecycle) during the development of the <a href="https://github.com/or-bit/monolith">monolith framework</a>.
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
            <TableRowColumn>0.1.0</TableRowColumn>
            <TableRowColumn><a href="https://github.com/niktekusho/travis-builds-reporter-web">GitHub</a></TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>travis-builds-reporter-web:frontend</TableRowColumn>
            <TableRowColumn>0.1.1</TableRowColumn>
            <TableRowColumn><a href="https://github.com/niktekusho/travis-builds-reporter-web/tree/master/client">GitHub</a></TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>travis-builds-reporter-web:backend</TableRowColumn>
            <TableRowColumn>0.1.0</TableRowColumn>
            <TableRowColumn><a href="https://github.com/niktekusho/travis-builds-reporter-web/tree/master/server">GitHub</a></TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>travis-builds-reporter-core</TableRowColumn>
            <TableRowColumn>latest</TableRowColumn>
            <TableRowColumn><a href="https://www.npmjs.com/package/travis-builds-reporter-core">npm registry</a></TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>travis-builds-reporter-utils</TableRowColumn>
            <TableRowColumn>latest</TableRowColumn>
            <TableRowColumn><a href="https://www.npmjs.com/package/travis-builds-reporter-utils">npm registry</a></TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
  );

export default About;
