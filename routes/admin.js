const { Router, response } = require('express');
var express = require('express');
var router = express.Router();
var admin_helpers = require('../helpers/admin_helper')
var jwt = require("jsonwebtoken");


router.post('/login', (req, res) => {
    admin_helpers.isLogin(req.body).then((response) => {

        if (response.login) {
            let data = {
                id: response.admin._id,
                name: response.admin.name

            }
            let token = jwt.sign(data, "key", { expiresIn: 86400 });
            response.token = token;
            res.send(response)
        }else{
            res.send(response)
            
        }

    })

})

module.exports = router;