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


    res.status(200).json({
        message: "VALIDATION ROUTE"
    })
})

module.exports = router;