const { Router } = require('express');
const { auth } = require('./../firebase');

const router = new Router();

// on POST > create user
router.post('/', async (req, res) => {

    try {

        // Create new user
        await auth.createUser(req.body)
    
        // tell client that all is ok
        res.send({ msg: 'User has been created.' })
    
    }

    catch(err) {
        res.status(500).send(err);
    }

})


module.exports = router;