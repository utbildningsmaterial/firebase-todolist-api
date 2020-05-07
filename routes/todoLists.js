const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();


// POST = skapa en ny lista
router.post('/', async (req, res) => {

    // generera ett KORT id
    let id = generateId(3);

    // Skapa ett dokument i lists collection med det genererade IDt.
    await db
    .collection('lists')
    .doc(id)
    .set({
        name: req.body.listName
    })

    // raportera till client.
    res.send({ msg: `List ${req.body.listName} created`, listId: id })

})

// GET = Hämta en lista med spec ID
router.get('/:id', async (req, res) => {

    let docs = [];

    // anropa fb, hämta doc med :id
    let snapShot = await db
    .collection('lists')
    .doc(req.params.id)
    .collection('todos')
    .get();
    
    snapShot.forEach(doc => {
        docs.push(doc.data())
    })

    res.send({ todos: docs })

})

router.post('/:id/todos', async (req, res) => {

    // leta reda på list Obj med :id
    await db
    .collection('lists')
    .doc(req.params.id)
    .collection('todos')
    .doc()
    .set(req.body)

    // tell client OK
    res.send({ msg: 'New Todo added.'})

})

router.put('/:id/todos/:todoid', async (req, res) => {

    // updatera en TODO :todoid till true / false
    await db
    .collection('lists')
    .doc(req.params.id)
    .collection('todos')
    .doc(req.params.todoid)
    .update(req.body)

    res.send({ msg: 'Todo updated.' })

})



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