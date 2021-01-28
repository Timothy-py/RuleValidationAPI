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

    // check to see if req obj contain is a valid JSON and has only two keys
    if(Object.keys(req_obj).length != 2){
        res.status(400).json({
            message: "Invalid JSON payload passed.",
            status: "error",
            data: null
        })
    }
    
    // check if the req obj contain the expected keys: rule
    if(!('rule' in req_obj) || !('data' in req_obj)){
        res.status(400).json({
            message: "rule is required.",
            status: "error",
            data: null
        })
    }
    // check if the req obj contain the expected keys: data
    if(!('data' in req_obj)){
        res.status(400).json({
            message: "data is required.",
            status: "error",
            data: null
        })
    }

    // check if the rule field is a valid JSON object and had just three keys
    if(Object.keys(req_obj.rule).length != 3){
        res.status(400).json({
            message: "Invalid JSON payload passed.",
            status: "error",
            data: null
        })
    }

    // check if the rule field contain the expected keys: field,
    if(!('field' in req_obj.rule)){
        res.status(400).json({
            message: "field is required.",
            status: "error",
            data: null
        })
    }
    // check if the rule field contain the expected keys:condition,
    if(!('condition' in req_obj.rule)){
        res.status(400).json({
            message: "condition is required.",
            status: "error",
            data: null
        })
    }
    // check if the rule field contain the expected keys:condition_value
    if(!('condition_value' in req_obj.rule)){
        res.status(400).json({
            message: "condition_value is required.",
            status: "error",
            data: null
        })
    }

    // conditional: to check if rule.field is a String value
    if(typeof(req_obj.rule.field) === "string"){
        // check if the string is a single value or nested object string
        let rule_field = req_obj.rule.field

        // check if it's a single value string
        if(rule_field.split(".").length == 1){
            // get rule.field data: One Level  
            let first_level = rule_field.split(".")[0]

            // check if 'first_level' is in data object
            if(first_level in req_obj.data){
                
                // CONTINUE OPERATION

            }else{
                res.status(400).json({
                    message: `field ${first_level} is missing from data`,
                    status: "error",
                    data: null
                })
            }
        } 

        // check if it's a two levels nested string
        else if(rule_field.split(".").length == 2){
            // get rule.field data: Two levels
            let first_level = rule_field.split(".")[0]
            let second_level = rule_field.split(".")[1]

            // check if first_level exist in data object
            if(first_level in req_obj.data){
                // check if second_level exist in data object
                if(second_level in req_obj.data.first_level){

                    // CONTINUE OPERATION

                }else{
                    res.status(400).json({
                        message: `field ${second_level} is missing from data`,
                        status: "error",
                        data: null
                    })    
                }

            }else{
                res.status(400).json({
                    message: `field ${first_level} is missing from data`,
                    status: "error",
                    data: null
                })
            }

        }else if(rule_field.split(".").length > 2){
            res.status(400).json({
                message: "Invalid JSON payload passed.",
                status: "error",
                data: null
            })
        }
    }else{
        res.status(400).json({
            message: `Field should be a String`,
            status: "error",
            data: null
        })
    }

    // res.status(200).json({
    //     message: "VALIDATION ROUTE"
    // })

})

// testing route
router.post('/tester', (req, res) => {
    let req_obj = req.body;

    console.log(req_obj)
    console.log(`Body Type: ${typeof(req_obj.rule.field)}`)
    console.log(`Body Type: ${(req_obj.rule.field)}`)
    res.send("done")
})

module.exports = router;