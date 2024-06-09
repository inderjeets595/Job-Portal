
import { body,validationResult } from "express-validator";

const validateRequest = async(req,res,next)=>{

  //1.Setup rules for validation
  const rules = [
    body('category').notEmpty().withMessage('Job Category is required'),
    body('tech').notEmpty().withMessage('Job Designation is required'),
    body('company').notEmpty().withMessage('Company Name is required'),
    body('location').notEmpty().withMessage('Job Location is required'),
    body('salary').isFloat({gt:0}).withMessage('Salary is required'),
    body('openings').isFloat({gt:0}).withMessage('Openings should be more than 0'),
    body('skills').notEmpty().withMessage('At Least One Skill is required to select'),
    body('date').notEmpty().withMessage('Date is required'),
  ]


  //2. Run those rules
  await Promise.all(rules.map((rule)  => rule.run(req)))

  //3. Check if there are any errors after running the rules
  const validationErrors =validationResult(req);

  //4. if errors, return the error message

  if(!validationErrors.isEmpty()){
    return res.render('add-job',{
        errorMessage:validationErrors.array()[0].msg
      })
  }
  next();
}

export default validateRequest;