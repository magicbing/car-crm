const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

//
const FileAsync = require('lowdb/adapters/FileAsync')
const adapter2 = new FileAsync('database/backup/20180826.json');
const dbBackup = low(adapter2);
fs.exists('database/backup/2018-8-26.json', function (exists) {
  if (exists) {
    console.log("文件存在")
  }
  if (!exists) {
    console.log("文件不存在")
  }
})
db.get('posts').cloneDeep().value()
db.get('users').value() //查询全部
db.get('users').map('phoneNo').value()

db.get('users').map().take(5).value()
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