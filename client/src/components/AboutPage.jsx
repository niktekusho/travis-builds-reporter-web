import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const About = () => (
  <div>
    <h2>About</h2>
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
            <TableRowColumn>0.1.0</TableRowColumn>
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
    <p>Project description</p>
    <p>Author</p>
    <div>Useful links</div>
  </div>
  );

export default About;
