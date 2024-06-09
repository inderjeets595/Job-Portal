import path from 'path';

import ApplicantsModel from '../models/applicants.model.js';
import JobModel from '../models/jobs.model.js';

export default class ApplicantsController{

  
  getApplicants(req, res){
    let applicant = ApplicantsModel.get();
    res.render("applicants",{applicant, userEmail : req.session.userEmail});
  }

  addNewApplicant(req,res){ 
    const {applicantname,emailid,applicantcontact} = req.body;
    const resume = 'resume/' + req.file.filename;
    ApplicantsModel.add(applicantname,emailid,applicantcontact,resume);
    var jobs = JobModel.get();
    return res.render('jobs',{jobs, userEmail : req.session.userEmail});  
  
  }


}