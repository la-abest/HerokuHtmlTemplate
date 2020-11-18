var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.post('/handleform', function(req, res, next) {
  var options = {
    'method': 'POST',
    'url': 'https://mczpcy6h6h406svhb8h119rpfb91.auth.marketingcloudapis.com/v2/token',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"grant_type":"client_credentials","client_id":"hvyrxazeydwv5hwrayjlllbv","client_secret":"X45DOsIYk0NYGFxwXetuRL8y","account_id":"523005653"})
  
  };
  request(options, function (error, response1) {
    if (error) {
      throw new Error(error);
    }
    else  {
      var options = {
        'method': 'POST',
        'url': 'https://mczpcy6h6h406svhb8h119rpfb91.rest.marketingcloudapis.com/interaction/v1/events',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(response1.body).access_token
        },
        body: JSON.stringify({"ContactKey":req.body.Email,"EventDefinitionKey":"APIEvent-6d254b54-02a6-bbb5-330f-9cc54956c231","Data":{"SubscriberKey":req.body.Email,"emailaddress":req.body.Email,"firstname":req.body.fname,"lastname":req.body.lname,"mobilenumber":req.body.phone,"location":req.body.location}})
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
      });
      res.render('thankyou', { message: 'Thank You For Submitting' });
    }
  });
  res.render('thankyou', { message: 'Thank You For Submitting' });
});

module.exports = router;
