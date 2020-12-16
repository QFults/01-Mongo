const db = require('mongojs')('user_db')

// db.users.find((err, users) => {
//   if (err) { console.log(err) }
//   console.log(users)
// })

// db.users.insert({
//   name: 'Jack Doe',
//   email: 'jackdoe@gmail.com'
// }, (err, user) => {
//   if (err) { console.log(err) }
//   console.log(user)
// })

// db.users.update({ name: 'Jack Doe' }, { $set: { email: 'jackdoe1@gmail.com' } }, err => {
//   if (err) { console.log(err) }
// })

// db.users.remove({ name: 'Jack Doe' }, err => {
//   if (err) { console.log(err) }
// })