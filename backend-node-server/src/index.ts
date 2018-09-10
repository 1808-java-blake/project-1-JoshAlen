// this will be the entry point for our application
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import { ersUserRouter } from './routers/ers-user-router';
import { reimbursementRouter } from './routers/reimbursement-router';

// create the app object from express
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// set the port
const port = 9001; // will use port from computers environment variables or 3000 if there is none
app.set('port', port);

const sess = {
  secret: 'keyboard cat',
  cookie: {secure: false},
  resave: false,
  saveUninitialized: false
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

// register session middleware
app.use(session(sess));

// log the request being made
app.use((req, res, next) => {
  console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
  next();
});

// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(
  express.static(path.join(__dirname, 'public'))
);

// use the body parser to convert request json
app.use(bodyParser.json());

//allows cors headers
app.use((req, resp, next) => {
  resp.header("Access-Control-Allow-Origin", "http://1808-project-1-josh.s3-website.us-east-2.amazonaws.com");
  resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  resp.header("Access-Control-Allow-Credentials", "true");
  next();
});

/*********************************************************************************************
 * API Routers
 ********************************************************************************************/

app.use('/users', ersUserRouter);
app.use('/reimbursements', reimbursementRouter);

app.use('/', (req, res, next) => {
  res.json("hello world");
});

const server = app.listen(port, () => {
  console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});
