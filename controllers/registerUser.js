const Users = require('../models/Users')
const bcrypt = require("bcrypt");


module.exports = async (req,res)=>{
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
    const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g

    const {firstName, lastName, institution, email, department, isStudent, password} = req.body


    const checkMissingAndEmptyValues = ()=>{
        return firstName && firstName !== "" && lastName && lastName.trim() !== "" && institution && institution.trim() !== "" && email && email.trim() !== "" && department && department.trim() !== "" && isStudent && password && password.trim() !== ""
    }

    const checkForValidValues = ()=>{
        const isEmailValid = validEmailRegex.test(email)
        const isPasswordValid = validPasswordRegex.test(password)
        const isFirstNameValid = firstName.length > 2;
        const isLastNameValid = lastName.length > 2;

        return {
            isAllValueValid : isEmailValid && isFirstNameValid && isLastNameValid && isPasswordValid,
            isEmailValid,
            isFirstNameValid,
            isLastNameValid,
            isPasswordValid
        }
    }

    const {isAllValueValid, isEmailValid, isFirstNameValid, isLastNameValid, isPasswordValid } = checkForValidValues()
    const checkExistingUser =  isEmailValid ? await Users.findOne({email}) : null

    if(checkExistingUser){
        res.status(409).json({
            "message" : `${email} is already registered with us. Please try different email.`
        })
    }

    if(!checkMissingAndEmptyValues()){
        res.status(400).json({
            "message": "Please provide all the required field"
        })
    }else if (!isAllValueValid){
        let error = {}
        if(!isEmailValid){
            error["email"] = `${email} is not a valid email. Please enter a valid one.`
        }if(!isPasswordValid){
            error["password"] = "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        }if(!isFirstNameValid){
            error["firstName"] = "Please enter First Name with more than 2 characters"
        }if(!isLastNameValid){
            error["lastName"] = "Please enter Last Name with more than 2 characters"
        }
        res.status(400).json({
            "message": 'Please provide valid values for the field',
            error
        })
    }else{
        const encryptedPassword = bcrypt.hashSync(password, 10);
        if(isStudent){
            const userDetails = {firstName,lastName,password:encryptedPassword,institution,department,email,isStudent,refreshToken:''}

            Users.create(userDetails).then(user=>{
                const {_id,firstName,lastName,email,department,institution,isStudent } = user
                res.status(201).json({
                "message": "User has been successfully registered",
                "data": {_id,firstName,lastName,email,department,institution,isStudent}
            })}).catch(error=> res.status(406).json({
                "message" : "User can't be created at the moment",
                "error": JSON.stringify(error)
            }))

        }
    
    }
	
    
}