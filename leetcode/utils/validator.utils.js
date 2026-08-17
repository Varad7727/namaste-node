const validator = require("validator")
const validate = (data) => {
    //data is in req.body
    const mandatoryFields = ["firstName", "emailId", "password"];

    const isAllowed = mandatoryFields.every((k) => Object.keys(data).includes(k));
    //consider k is a field and data objects are created it checks whether each k contains mentioned data or not
    if(!isAllowed)
        throw new Error("All Fields Are Required");
    if(!validator.isEmail((data.emailId)))
        throw new Error("Wrong mail");
    if(!validator.isStrongPassword(data.password))
        throw new Error("Weak Password");
}
module.exports = validate;