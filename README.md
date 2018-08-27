# car-crm
1.浏览器进入界面
2.操作 发送请求到后台
3.后台根据json 写入数据库 或返回查询结果
4.node与数据库的交互
5.数据库备份等

新增
  var par = {
    'phoneNo': phoneNo, // 主键 手机号
    'remark': remark, // 备注 
    'plateNo': plateNo, // 车牌号
    'milage': milage, // 公里数
    'wax': wax, // 打蜡次数
    'wash': wash, // 精洗次数
    'polish': polish, // 抛光次数
    'disinfection': disinfection  // 车内消毒次数
    // 'package': package, // 套餐 A B C ...
    // 'remainder': remainder, // 剩余次数
  }

//changelog all
{
  "phoneNo": "13222225555q",
  "logs": [
    {
      "time": "1535393886758",
      "old": {
        "phoneNo": "13222225555q",
        "remark": "123",
        "plateNo": "测试2",
        "milage": "2",
        "wax": "3",
        "wash": "4",
        "polish": "",
        "disinfection": "72"
      },
      "new": {
        "phoneNo": "13222225555q",
        "remark": "123",
        "plateNo": "测试2",
        "milage": "2",
        "wax": "3",
        "wash": "4",
        "polish": "",
        "disinfection": "72"
      }
    }
  ]
}