const { json } = require('express');

const router = require('express').Router();

// GET: base route
router.get('/', (req, res)=>{
    res.status(200).json({
        message: "My Rule-Validation API",
        status: "success",
        data: {
            name: "Timothy ADEYEYE",
            github: "@Timothy-py",
            email: "adeyeyetimothy33@gmail.com",
            mobile: "09053530521",
            twitter: "@Tim0thyAdeyeye"
        }
    })
})


// POST: rule validation route
router.post('/validate-rule', (req, res) => {

    let req_obj = req.body

    // check to see if req obj contain only two keys
    if(Object.keys(req_obj).length != 2){
        res.status(400).json({
            message: "The JSON data passed has more or less keys than expected: Expected(2)",
            status: "error",
            data: {
                isValidForRule: true
            }
        })
    }
    
    // check if the req obj contain the expected keys: rule and data
    if(!('rule' in req_obj) || !('data' in req_obj)){
        res.status(400).json({
            message: "The JSON data passed does not contain the expected keys: Expected(rule, data)",
            status: "error",
            data: {
                isValidForRule: true
            }
        })
    }

    // check if the rule field is a valid JSON object and had just three keys
    if(Object.keys(req_obj.rule).length != 3){
        res.status(400).json({
            message: "The Rule field passed has more or less keys than expected: Expected(3)",
            status: "error",
            data: {
                isValidForRule: true
            }
        })
    }

    // check if the rule field contain the expected keys: field, condition, condition_value
    if(!('field' in req_obj.rule) || !('condition' in req_obj.rule) || !('condition_value' in req_obj.rule)){
        res.status(400).json({
            message: "The Rule Field does not contain the expected keys: Expected(field, condition, condition_value)",
            status: "error",
            data: {
                isValidForRule: true
            }
        })
    }

    


    res.status(200).json({
        message: "VALIDATION ROUTE"
    })
})

module.exports = router;