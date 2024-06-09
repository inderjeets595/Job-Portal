import path from 'path'; 
import JobModel from '../models/jobs.model.js'

export default class JobsController{
  
  getHome(req,res){
      res.render('index')
  }

  getJobs(req,res){
    var jobs = JobModel.get();
    res.render('jobs',{jobs,userEmail:req.session.userEmail })
  }

  getNewJobs(req,res){
    res.render("add-job", {errorMessage : null,userEmail:req.session.userEmail});
  }

  addNewJob(req,res){
    const {name,company,category,tech,location,salary, date,openings,skills} = req.body;
    JobModel.add(name,company,category,tech,location,salary, date,openings,skills);
    var jobs =JobModel.get()
    res.render("jobs", {jobs,errorMessage : null,userEmail:req.session.userEmail});
  }

  getJobDetail(req,res){
    const id = req.params.id;
    const retrieveJob = JobModel.getById(id)
    if(retrieveJob)
      res.render('detail',{job:retrieveJob,errorMessage: null,userEmail:req.session.userEmail});
    else
      res.status(401).send('Job not found');
  }

  jobUpdateView(req,res){
    const id = req.params.id;
    const retrieveJob = JobModel.getById(id)
    if(retrieveJob)
      res.render('update-job',{job:retrieveJob,errorMessage: null,userEmail:req.session.userEmail});
    else
      res.status(401).send('Job not found');
  }

  postUpdateJob(req,res){
   JobModel.update(req.body);
   var jobs =JobModel.get()
   res.render("jobs", {jobs,errorMessage : null,userEmail:req.session.userEmail});
  }

  deleteJob(req,res){
    const id = req.params.id;
    const retrieveJob = JobModel.getById(id)
    
    if(!retrieveJob){
      return res.status(401).send('Jobs not found');
    }

    JobModel.delete(id);
    var jobs = JobModel.get();
    return res.render('jobs', {jobs, userEmail : req.session.userEmail});

  }

  searchJob(req,res){
    if(req.body.search !=''){
     const jobs =  JobModel.search(req.body.search);
     res.render('jobs',{jobs, userEmail : req.session.userEmai})
    }

  }

}