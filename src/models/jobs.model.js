
export default class JobModel {

  constructor(_id,_name, _company, _category, _tech, _location, _salary, _date, _openings, _skills) {
    this.id = _id
    this.name=_name
    this.company = _company
    this.category = _category
    this.tech = _tech
    this.location = _location
    this.salary = _salary
    this.date = _date
    this.openings = _openings
    this.skills = _skills
  }

  static get() {
    return jobs;
  }

  static add(name,company, category, tech, location, salary, date, openings, skills) {
    jobs.push(new JobModel(jobs.length + 1,name, company, category, tech, location, salary, date, openings, skills));
  }

  static getById(id) {
    const job = jobs.find((job) => job.id == id)
    return job;
  }

  static update(data){
   
    const { id, name, company, category, tech, location, salary, date, openings, skills } = data;
    const index = jobs.findIndex((j) => j.id == id);
    jobs[index] = data;
  }

  static delete(id){
    const index = jobs.findIndex((j) => j.id == id);
    jobs.splice(index,1)
  }

  static search(val){
    const filteredJobs = jobs.filter(job => job.name.includes(val));
    return filteredJobs;
  }
  
}

var jobs = [
  new JobModel(1,'Java', 'Amazon', 'Tech', 'SDE-1', 'Gurugram IND Remote', '6-7', '2023-11-30', 4, ['JS', 'NodeJs', 'ReactJs', 'Express', 'Java', 'SpringBoot','NextJs',]),
  new JobModel(2, 'React Frontend Developer', 'Facebook', 'Tech', 'Full Stack Developer', 'Banglore IND', '8-9', '2023-11-20', 8, ['DSA', 'JavaScript', 'React', 'Node', 'Express',  'Tailwind CSS',]),
  new JobModel(3, 'Java Backend Developer','Infosys', 'Tech', 'Python', 'Noida On-Site', '7-8', '2023-12-02', 13, ['c', 'C++', 'Java', 'SpringBoot', 'Python', 'Graphics', 'DSA']),
  new JobModel(4, 'Hr Opening','TCS', 'Non-Tech', 'HR Manager', 'Noida IND', '4-5', '2023-12-10', 2, ['English', 'Comm Skills', 'Management Theory', 'Apptitude', 'Presentation Skills']),
]