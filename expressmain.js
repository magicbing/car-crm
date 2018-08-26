//express
const express = require('express')
const path = require('path')
const app = express()
bodyParser = require('body-parser');
const router = express.Router(); 
//lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database/db.json')
const db = low(adapter)
// backup
const fs = require('fs');
//常量
const port = process.env.PORT || 3000;

// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next(); // 在这里会将request交给下一个中间件，如果这个中间件后面没有其他中间件，请求会交给匹配的路由作处理
});
// 创建一条bear (用 POST动词访问uri http://localhost:8080/api/add)
router.route('/add').post(function(req, res) {
  console.log(req.body)
  var json = db.get('users').find({ 'phoneNo': req.body.phoneNo }).value()
  if ( !json ) {
    db.get('users').push(req.body).write()
    res.json({ success: '创建 ' + req.body.phoneNo + ' 成功。' })
  } else {
    res.json({ error: '已存在 ' + req.body.phoneNo + ' 的数据!' });
  }
  /* var bear = new Bear();      // 创建一个Bear model的实例
  bear.name = req.body.name;  // 从request取出name参数的值然后设置bear的name字段
  // 保存bear，加入错误处理，即把错误作为响应返回
  bear.save(function(err) {
      if (err)
          res.send(err);
      res.json({ message: 'Bear created!' });
  }); */
});

router.route('/query').post(function(req, res) {
  console.log(req.body)
  var json = db.get('users').find({ 'phoneNo': req.body.phoneNo }).value()
  if ( !!json ) {
    res.json( json );
  } else {
    res.json({ error: '没有 ' + req.body.phoneNo + ' 的数据!' });
  }
});

router.route('/modify').post(function(req, res) {
  console.log(req.body)
  var json = db.get('users').find({ 'phoneNo': req.body.phoneNo }).value()
  if ( !!json ) {
    db.get('users').find({ 'phoneNo': req.body.phoneNo }).assign(req.body).write()
    res.json({ success: '修改 ' + req.body.phoneNo + ' 成功。' });
  } else {
    res.json({ error: '没有 ' + req.body.phoneNo + ' 的数据!' });
  }
});

router.route('/queryAll').post(function(req, res) {
  console.log(req.body)
  var json = db.get('users').value()
  if ( !!json ) {
    res.json( json );
  } else {
    res.json({ error: '暂无数据!' });
  }
});

/* router.get('/add', function(req, res) {
  res.json({ message: 'router get add' });   
}); */
// 注册路由
// 所有的路由会加上“／api”前缀
app.use('/api', router);

app.use(express.static(path.join(__dirname, 'frontend')))
app.get('/0', function (req, res) {
  res.send('Hello World')
})
// Increment count
db.update('count', n => n + 1).write()

/* 
 * backup func 
 * 每日第一次启动程序备份
 */
function copyData() {
  var date = new Date()
  var time = date.toLocaleDateString()
  var from = 'database/db.json'
  var to = 'database/backup/' + time + '.json'
  fs.exists('database/backup/' + time + '.json', function(exists){
    if (exists) {
      console.log( time + '.json 文件存在, 今日已备份' )
    }
    if (!exists) {
      fs.createReadStream(from).pipe(fs.createWriteStream(to)) //大文件复制
      console.log( time + '.json 备份成功' )
    }
  })
  // fs.writeFileSync(to, fs.readFileSync(from)) //小文件复制
  // var time = date.getFullYear().toString() + ( date.getMonth()+1 ).toString() + date.getDate().toString()
  // copyData( 'database/db.json', 'database/backup/201808263.json' )
}
copyData()

app.listen(port)