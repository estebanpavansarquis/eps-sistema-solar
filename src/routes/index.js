const { Router } = require('express')
const router = Router()


router.get('/', function(req, res) {
  res.send( { title: 'Sistema Solar' });
});


module.exports = router;