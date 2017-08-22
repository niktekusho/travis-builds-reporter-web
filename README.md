# Introduction

**travis-builds-reporter-web** is a webapp that makes easy to fetch and display basic builds statistics for a Travis enabled ***public*** repository.

You can find a running instance of this app on [my **personal** heroku](https://travis-builds-reporter.herokuapp.com) ( ***please do not DOS it...*** :pray:).

Below you can find a snapshot of what you can expect from this app.

![Application demo: fetch and display builds statistics from niktekusho/travis-builds-reporter repository](./demo/usage.gif)

# What's in here?

There are 2 separate projects inside this one:
1.  the [client](./client/) project serves as the frontend part of the application. It is a [create-react-app project](https://github.com/facebookincubator/create-react-app).
2.  the [server](./server/) project serves as the backend part of the application. It is a simple [express](https://github.com/expressjs/express) application.

The root project is a *container* for the 2 parts. 
This is useful since you (and me) can and should develop the 2 parts indipendently.

## The *root* (project)

Here we can talk about specific files and list of defined commands for the root project.

### Root files

-   [`notes`](./notes): simple text file containing personal notes/reminders (probably I should this delete from the repository but whatever... :hatched_chick:)
-   [`package.json`](./package.json): standard JS project manifest
-   [`Procfile`](./Procfile): simple (at least in this case I'd dare to say... :bowtie:) text file containing instruction(s) for a [Heroku deploy](https://heroku.com). You can read about Procfiles [here](https://devcenter.heroku.com/articles/procfile).
-   [`yarn.lock`](./yarn.lock): if you do not use [yarn](https://yarnpkg.com), you're definitely not a good person. **Just kidding!** :joy: In few words, it's basically a faster (as of 22/08/2017) npm alternative. For more, please take a look at their [website](https://yarnpkg.com).

### Available commands

Command name     | Usage                                       | Description
-----------------|---------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*heroku-postbuild* | N.N.T.K (No Need To Know, Heroku calls it!) | Used when deploying to Heroku, it clears any cached frontend bundle and rebuilds it. Actually, not sure why I needed it in the first place...
*build*            | `npm run build`                               | Compile both project for deployment.
*build-client*     | `npm run build-client`                        | Compile frontend for deployment. Creates a static bundle you can serve with any static server.
*build-server*     | `npm run build-server`                        | Compile backend for deployment. Uses [babel](https://babeljs.io/).
*clean*            | `npm run clean`                               | Deletes node_modules directories in both projects.
*clean-client*     | `npm run clean-client`                        | Deletes node_modules directory in [client](./client/) project.
*clean-server*     | `npm run clean-server`                        | Deletes node_modules directory in [server](./server/) project.
*start*            | `npm start`                                   | Starts in **development** mode both the backend and the frontend. It should also open a browser tab/window with the current instance of the app.
*start:prod*       | `npm run start:prod`                          | Starts only the backend part using the last transpiled source. You should use this only when deploying the application (combined with the envvar NODE_ENV set to "production").
*start-client*     | `npm run start-client`                        | Starts only the frontend part in **development mode**. It should also open a browser tab/window with the current instance of the app.
*start-server*     | `npm run start-server`                        | Starts only the backend part in **development mode**.

# What do you need?

You can build this application on your own using node (check [Node.js](https://nodejs.org) for instructions on how to install it):  
    1.  `git clone https://github.com/niktekusho/travis-builds-reporter-web`  
    2.  `cd travis-builds-reporter-web/`  
    3.  `npm i && npm start`

# Related projects

Checkout [travis-builds-reporter](https://github.com/niktekusho/travis-builds-reporter) for the core packages that made this app possible.

# What's next?
To do:
-   Improve this document
-   Give more options like:
    -   possibility to save the output to a JSON file
-   *What else?* (cit.)

