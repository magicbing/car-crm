console.log('this is index.js')

var api = 'http://localhost:3000/api/'

$('#add-btn').click(function () {
  console.log('this is add-btn')
  var par = {
    'phoneNo': $('#add-phoneNo').val(), //主键手机号
    'package': $('#add-package').val(), //套餐 A B C ...
    'remainder': $('#add-remainder').val(), //剩余次数
    'remark': $('#add-remark').val() //备注
  }
  $.ajax({
    type: 'post',
    url: api + 'add',
    data: par,
    dataType: 'json',
    success: function(data) {
      console.log( data )
    }
  });
})