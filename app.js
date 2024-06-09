
import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';

//import middlewares
import validationMiddleware from './src/middlewares/validation.middleware.js'
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import { auth } from './src/middlewares/auth.middleware.js';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
//import controllers
import UserController from './src/controllers/user.controller.js';
import JobsController from './src/controllers/jobs.controller.js';
import ApplicantsController from './src/controllers/applicants.controller.js';
//create instance of controllers

const userController = new UserController();
const jobsController = new JobsController();
const applicantsController= new ApplicantsController();

const app = express()
const PORT = 3000

app.use(express.static('public'))
//app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser());

app.use(session({
  secret:'secretKey',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false}
}))
//Set view engine
app.set('view engine','ejs')
app.set('views', path.join(path.resolve(),"src","views"))

//use the ejs middleware 
app.use(ejsLayouts)
app.use(express.static('src/views'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//User controller 
app.get('/login', userController.getLogin);
app.post('/register',userController.postRegister)
app.post('/login',userController.postLogin)
app.get('/logout', userController.logout);

//job controller
app.get('/',jobsController.getHome)
app.get('/jobs',jobsController.getJobs);
app.get('/job/add',auth,jobsController.getNewJobs)
app.post('/jobs',validationMiddleware,auth,jobsController.addNewJob)

app.get('/job/detail/:id',setLastVisit,jobsController.getJobDetail);
app.get('/job/edit/:id',auth,jobsController.jobUpdateView);
app.post('/job/update',auth,jobsController.postUpdateJob)

app.get('/job/delete/:id',auth,jobsController.deleteJob);   
app.post('/job/search',jobsController.searchJob)

app.get('/applicants',auth, applicantsController.getApplicants);
app.post('/applied',uploadFile.single('resume'), applicantsController.addNewApplicant);

// app.get('/resume/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join(path.resolve(),'public', 'resume',filename);
//   res.send(filePath);
// });


app.listen(PORT,()=>console.log(`Server is running at ${PORT}! `))

