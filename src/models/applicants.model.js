export default class ApplicantsModel{

  constructor(id,applicantname,emailid,applicantcontact,resume,){
      this.id =  id;
      this.applicantname = applicantname;
      this.emailid = emailid;
      this.applicantcontact = applicantcontact;
      this.resume = resume;
  }   
  
  static get() {
      return applicants;
  }
  static add(applicantname, emailid, applicantcontact, resume){
      const newApplicant = new ApplicantsModel(applicants.length+1, applicantname, emailid, applicantcontact, resume);
      applicants.push(newApplicant);
  }
}

var applicants=[
  new ApplicantsModel(1, 'john Doe', 'johndoe@gmail.com', 8099123767,'resume/resume1.docx'),
  new ApplicantsModel(2, 'Neha ', 'neha2609@gmail.com', 9813280667,'resume2.pdf'),
  new ApplicantsModel(3, 'Mohit Aggarwal', 'mohitaggarwal2801@gmail.com',9873327805,'resume3.pdf'),
];