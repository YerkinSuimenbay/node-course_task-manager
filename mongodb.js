const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectId()
// console.log(id.id.length);
// console.log(id.toHexString());
// console.log(typeof id.getTimestamp());

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    if (error) return console.log('Unable to connect to database');
    console.log('Connected to server...');

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'CCC',
    //     age: 12,
    // }, (error, result) => {
    //     if (error) return console.log('Unable to insert user');

    //     console.log(result);
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'A',
    //         completed: false,
    //     },
    //     {
    //         description: 'B',
    //         completed: true,
    //     },
    //     {
    //         description: 'C',
    //         completed: false,
    //     },
    // ], (error, result) => {
    //     if (error) return console.log('Unable to insert docs');

    //     console.log(result);
    // })

    // db.collection('users').findOne({ name: 'Y' }, (error, user) => {
    //     if (error) return console.log('Unable to find the user');
    //     console.log(user);
    // })
    // db.collection('users').find({}).toArray((error, users) => {
    //     if (error) return console.log('Unable to find users');
    //     console.log(users);
    // })

    // const cursor = db.collection('users').find({})
    // console.log(cursor.count((error, count) => console.log(count)));
    // cursor.count().then(num => console.log(num)).catch(err => console.log(err));

    // db.collection('tasks').findOne({ _id: ObjectId('61332a8ad3a370d8790eb7cb')}, (error, task) => {
    //     if (error) return console.log(error);
    //     console.log(task);
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     if (error) return console.log('Unable to fetch uncompleted tasks');
    //     console.log(tasks);
    // })

    // db.collection('users').updateOne({ _id: ObjectId("613328708f8806ff07c098d4") }, {
    //     $inc: {
    //         age: 2
    //     },
    //     $set: {
    //         'last-name': "Suimenbay",
    //         name: "Yerkin"
    //     }
    // })
    // .then(res => console.log(res))
    // .catch(err => console.log(err))

    // db.collection('tasks').updateMany({ completed: false }, {
    //     $set: {
    //         completed: true
    //     }
    // })
    // .then(res => console.log(res))
    // .catch(err => console.log(err))

    db.collection('users')
        .deleteMany({ age: 12 })
        .then(res => console.log(res))
        .catch(err => console.log(err))

    db.collection('tasks').deleteOne({ description: "A" })
    .then(res => console.log(res))
    .catch(err => console.log(err))
})