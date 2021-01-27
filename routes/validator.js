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
    res.status(200).json({
        message: "VALIDATION ROUTE"
    })
})

module.exports = router;