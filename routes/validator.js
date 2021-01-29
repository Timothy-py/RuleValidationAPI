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

        invalid_json(res)

    }
    
    // check if the req obj contain the expected keys: rule
    if(!('rule' in req_obj)){
        
        required_field(res, "rule")

    }
    // check if the req obj contain the expected keys: data
    if(!('data' in req_obj)){
        
        required_field(res, "data")

    }

    // check if the rule field is a valid JSON object and had just three keys
    if(Object.keys(req_obj.rule).length != 3){
        
        invalid_json(res)

    }

    // check if the rule field contain the expected keys: field,
    if(!('field' in req_obj.rule)){
        
        required_field(res, "field")

    }
    // check if the rule field contain the expected keys:condition,
    if(!('condition' in req_obj.rule)){
        
        required_field(res, "condition")

    }
    // check if the rule field contain the expected keys:condition_value
    if(!('condition_value' in req_obj.rule)){
        
        required_field(res, "condition_value")

    }

    // **************************************************************************************************

    // conditional: to check if rule.field is a String value
    if(typeof(req_obj.rule.field) === "string"){
        // check if the string is a single value or nested object string
        let rule_field = req_obj.rule.field

        // check if it's a single value string
        if(rule_field.split(".").length == 1){
            // get rule.field data: One Level  
            let first_level = rule_field.split(".")[0]

            // check if req_obj.data is JSON, Array or String
            // this is one checks for type JSON object
            if((typeof(req_obj.data) == 'object') && !(req_obj.data instanceof Array)){

                // check if 'first_level' is in data object
                if(first_level in req_obj.data){
                    
                    let data_field = req_obj.data[first_level]

                    // check if accepted condition is passed
                    const accepted_conditions = ["eq", "neq", "gt", "gte", "contains"]
                    let passed_condition = req_obj.rule.condition

                    if(accepted_conditions.includes(passed_condition)){
                        
                        let condition_value = req_obj.rule.condition_value

                        // ************NOW PERFORM THE RULE VALIDATION HERE*****************
                        switch (passed_condition) {
                            case "eq":
                                if(data_field == condition_value){
                                    passed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "neq":
                                if(data_field != condition_value){
                                    passed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "gt":
                                if(data_field > condition_value){
                                    passed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "gte":
                                if(data_field >= condition_value){
                                    passed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "contains":
                                if(data_field.includes(condition_value)){
                                    passed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }
                                break
                        }

                    }else{
                        res.status(400).json({
                            message: `Invalid condition ${passed_condition} passed`,
                            status: "error",
                            data: null
                        })
                    }

                }else{
                    
                    missing_field(res, first_level)

                }

            // if request object.data is of type string
            }else if(typeof(req_obj.data) == 'string'){
                let rule_field = req_obj.rule.field
                let data_field = req_obj.data
                let condition = req_obj.rule.condition
                let condition_value = req_obj.rule.condition_value

                // check if rule.field is same as req_obj.data
                if(rule_field === data_field){
                    // check if accepted condition is passed
                    const accepted_conditions = ["eq", "neq", "gt", "gte", "contains"]
                    let passed_condition = req_obj.rule.condition

                    if(accepted_conditions.includes(passed_condition)){

                        // ************NOW PERFORM THE RULE VALIDATION HERE*****************
                        switch (passed_condition) {
                            case "eq":
                                if(data_field == condition_value){
                                    passed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "neq":
                                if(data_field != condition_value){
                                    passed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "gt":
                                if(data_field > condition_value){
                                    passed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "gte":
                                if(data_field >= condition_value){
                                    passed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "contains":
                                if(data_field.includes(condition_value)){
                                    passed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }
                                break
                        }

                    }else{
                        res.status(400).json({
                            message: `Invalid condition ${passed_condition} passed`,
                            status: "error",
                            data: null
                        })
                    }
                }else{
                    failed_validation(res, rule_field, data_field, condition, condition_value)
                }
            
            //this one checks for req_obj.data type ARRAY 
            }else if((typeof(req_obj.data) == 'object') && (req_obj.data instanceof Array)){
                let rule_field = req_obj.rule.field
                let data_field = req_obj.data
                let condition = req_obj.rule.condition
                let condition_value = req_obj.rule.condition_value

                // check if rule.field is same as req_obj.data
                if(rule_field === data_field){
                    // check if accepted condition is passed
                    const accepted_conditions = ["eq", "neq", "gt", "gte", "contains"]
                    let passed_condition = req_obj.rule.condition

                    if(accepted_conditions.includes(passed_condition)){

                        // ************NOW PERFORM THE RULE VALIDATION HERE*****************
                        switch (passed_condition) {
                            case "eq":
                                if(data_field == condition_value){
                                    passed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "neq":
                                if(data_field != condition_value){
                                    passed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "gt":
                                if(data_field > condition_value){
                                    passed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "gte":
                                if(data_field >= condition_value){
                                    passed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, rule_field, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "contains":
                                if(data_field.includes(condition_value)){
                                    passed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, first_level, data_field, passed_condition, condition_value)
                                }
                                break
                        }

                    }else{
                        res.status(400).json({
                            message: `Invalid condition ${passed_condition} passed`,
                            status: "error",
                            data: null
                        })
                    }
                }else{
                    missing_field(res, rule_field)
                }
            }
        } 

        // **********************************************************************************
        // check if it's a two levels nested string
        else if(rule_field.split(".").length == 2){
            // get rule.field data: Two levels
            let first_level = rule_field.split(".")[0]
            let second_level = rule_field.split(".")[1]

            // check if first_level exist in data object
            if(first_level in req_obj.data){
                // check if second_level exist in data object
                if(second_level in req_obj.data[first_level]){

                    let data_field = req_obj.data[first_level][second_level]

                    // check if accepted condition is passed
                    const accepted_conditions = ["eq", "neq", "gt", "gte", "contains"]
                    let passed_condition = req_obj.rule.condition

                    if(accepted_conditions.includes(passed_condition)){
                        
                        let condition_value = req_obj.rule.condition_value
                        let field = `${first_level}.${second_level}`

                        // ************NOW PERFORM THE RULE VALIDATION HERE*****************
                        switch (passed_condition) {
                            case "eq":
                                if(data_field == condition_value){
                                    passed_validation(res, field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, field, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "neq":
                                if(data_field != condition_value){
                                    passed_validation(res, field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, field, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "gt":
                                if(data_field > condition_value){
                                    passed_validation(res, field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, field, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "gte":
                                if(data_field >= condition_value){
                                    passed_validation(res, field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, field, data_field, passed_condition, condition_value)
                                }
                                break;
                            case "contains":
                                if(data_field.includes(condition_value)){
                                    passed_validation(res, field, data_field, passed_condition, condition_value)
                                }else{
                                    failed_validation(res, field, data_field, passed_condition, condition_value)
                                }
                                break
                        }

                    }else{
                        res.status(400).json({
                            message: `Invalid condition ${passed_condition} passed`,
                            status: "error",
                            data: null
                        })
                    }

                }else{
                    missing_field(res, second_level)
                }

            }else{
                missing_field(res, first_level)
            }

        }else if(rule_field.split(".").length > 2){
            
            invalid_json(res)

        }
    }else{
        res.status(400).json({
            message: `Field should be a String.`,
            status: "error",
            data: null
        })
    }

})


// ********************FUNCTIONS***********************
function missing_field(res, field){
    res.status(400).json({
        message: `field ${field} is missing from data.`,
        status: "error",
        data: null
    })
}

function required_field(res, field){
    res.status(400).json({
        message: `${field} is required.`,
        status: "error",
        data: null
    })
}

function invalid_json(res){
    res.status(400).json({
        message: "Invalid JSON payload passed.",
        status: "error",
        data: null
    })
}

function passed_validation(res, field, field_value, condition, condition_value){
    res.status(200).json({
        message: `field ${field} successfully validated.`,
        status: "success",
        data: {
            validation: {
                error: false,
                field: field,
                field_value: field_value,
                condition: condition,
                condition_value: condition_value
            }
        }
    })
}

function failed_validation(res, field, field_value, condition, condition_value){
    res.status(400).json({
        message: `field ${field} failed validation.`,
        status: "error",
        data: {
            validation: {
                error: true,
                field: field,
                field_value: field_value,
                condition: condition,
                condition_value: condition_value
            }
        }
    })
}



module.exports = router;