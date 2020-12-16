const db = require('mongojs')('list_db')
const { prompt } = require('inquirer')
require('console.table')

const menu = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View Items', 'Create An Item', 'Update An Item', 'Delete An Item']
  })
    .then(({ action }) => {
      switch (action) {
        case 'View Items':
          viewItems()
          break
        case 'Create An Item':
          createItem()
          break
        case 'Update An Item':
          updateItem()
          break
        case 'Delete An Item':
          deleteItem()
          break
      }
    })
    .catch(err => console.log(err))
}

const viewItems = () => {
  db.items.find((err, items) => {
    if (err) { console.log(err) }
    console.table(items)
    menu()
  })
}

const createItem = () => {
  prompt({
    type: 'input',
    name: 'text',
    message: 'What is the item?'
  })
    .then(item => {
      db.items.insert(item, err => {
        if (err) { console.log(err) }
        console.log('Item Created!')
        menu()
      })
    })
    .catch(err => console.log(err))
}

const updateItem = () => {
  db.items.find((err, items) => {
    if (err) { console.log(err) }

    prompt([
      {
        type: 'list',
        name: '_id',
        message: 'Select the item to update:',
        choices: items.map(({ _id, text }) => ({
          name: text,
          value: _id
        }))
      },
      {
        type: 'input',
        name: 'text',
        message: 'Type the new value for the item:'
      }
    ])
      .then(({ _id, text }) => {
        db.items.update({ _id }, { $set: { text } }, err => {
          if (err) { console.log(err) }
          console.log('Item Updated!')
          menu()
        })
      })
      .catch(err => console.log(err))
  })
}

const deleteItem = () => {
  db.items.find((err, items) => {
    if (err) { console.log(err) }

    prompt({
      type: 'list',
      name: '_id',
      message: 'Select the item to delete:',
      choices: items.map(({ _id, text }) => ({
        name: text,
        value: _id
      }))
    })
      .then(({ _id }) => {
        db.items.remove({ _id }, err => {
          if (err) { console.log(err) }
          console.log('Item Deleted!')
          menu()
        })
      })
      .catch(err => console.log(err))
  })
}

menu()
