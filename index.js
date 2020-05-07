const express = require('express');

const app = express();

app.use(express.static('public'))

// alla post.body > json
app.use(express.json());

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

const listsRoute = require('./routes/todoLists');
app.use('/lists', listsRoute);


app.listen(3000, () => {
    console.log('Server up n running!');
})