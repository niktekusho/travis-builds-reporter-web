# Introduction
**travis-builds-reporter-web/server** is the backend project of the "webapp that makes easy to fetch and display basic builds statistics for a Travis enabled ***public*** repository".

# What's in here?
The only relevant file should be `server.js`:
1.  it checks if it has been launched in the correct directory and launch the `main` function of the server when in the correct directory
2.  it fetches all known `package.json`-s in the project (root project, client project and this project of course)
3.  it instantiate and configure an [express](https://github.com/expressjs/express) server with the following middlewares:
    -   [cors](https://github.com/expressjs/cors)
    -   [body-parser](https://github.com/expressjs/body-parser)
    -   [ddos](https://github.com/rook2pawn/node-ddos)  
    and the following routes:  

HTTP Method | Route       | Description
------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*GET*         | `/`         | If "NODE_ENV" is "production", serves the static bundle of the app.
*GET*         | `/versions` | Returns the specific versions of some packages used in this app, including [travis-builds-reporter](https://github.com/niktekusho/travis-builds-reporter) packages.
*POST*        | `/builds`   | Given a repository string (request body), it returns all the builds it can find on Travis for that repository. If no repository is specified, or there are errors it returns an HTTP 500 error with a possible cause.
