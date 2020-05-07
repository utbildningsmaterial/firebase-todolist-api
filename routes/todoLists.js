const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();


// POST = skapa en ny lista
router.post('/', async (req, res) => {

    // generera ett KORT id
    let id = generateId(3);

    // Skapa ett dokument i lists collection med det genererade IDt.
    await db.collection('lists').doc(id).set({
        name: req.body.listName
    })

    // raportera till client.
    res.send({ msg: `List ${req.body.listName} created`, listId: id })

})

// GET = Hämta en lista med spec ID

// PUT = Uppdatera en lista


module.exports = router;


function generateId(length) {

    let id = '';
    let chars = 'abcdefghijklmnopqrstuvxyz0123456789';

    for(let i=0; i<length; i++){
        let rand = Math.floor(Math.random()*chars.length);
        id += chars[rand];
    }

    return id;

}