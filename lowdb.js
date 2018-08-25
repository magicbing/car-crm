const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
// db.defaults({ posts: [], user: {}, count: 0 })
//   .write()

// Add a post
db.get('posts')
  .push({
    'phoneNo': '13811112222', //主键手机号
    'package': 'A', //套餐 A B C ...
    'remainder': '20', //剩余次数
    'remark': 'this is remark' //备注
  })
  .write()

// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode')
  .write()
  
// Increment count
db.update('count', n => n + 1)
  .write()

console.log( db.get('posts')
  .find({ 'phoneNo': '13811112222' })
  .value() )