console.log('this is index.js')

var api = 'http://localhost:3000/api/'

$('#add-btn').click(function () {
  console.log('this is add-btn')
  var phoneNo = $('#add-phoneNo').val()
  var remark = $('#add-remark').val()
  var plateNo = $('#add-plateNo').val()
  var milage = $('#add-milage').val()
  var wax = $('#add-wax').val()
  var wash = $('#add-wash').val()
  var polish = $('#add-polish').val()
  var disinfection = $('#add-disinfection').val()
  // var package = $('#add-package').val()
  // var remainder = $('#add-remainder').val()
  if ( !phoneNo ) { alert('手机号必须填写。');return; }
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
  $.ajax({
    type: 'post',
    url: api + 'add',
    data: par,
    dataType: 'json',
    success: function(data) {
      console.log( data )
      if ( !!data.success ) {alert( data.success )}
      if ( !!data.error ) {alert( data.error )}
    }
  });
})

$('#query-btn').click(function () {
  console.log('this is query-btn')
  var phoneNo = $('#query-phoneNo').val()
  if ( !phoneNo ) { alert('手机号必须填写。');return; }
  var par = {
    'phoneNo': phoneNo // 主键 手机号
  }
  $.ajax({
    type: 'post',
    url: api + 'query',
    data: par,
    dataType: 'json',
    success: function(data) {
      console.log( data )
      if ( !!data.success ) {alert( data.success )}
      if ( !!data.error ) {
        alert( data.error )
      } else {
        $('#detail-phoneNo').val(data.phoneNo)
        $('#detail-remark').val(data.remark)
        $('#detail-plateNo').val(data.plateNo)
        $('#detail-milage').val(data.milage)
        $('#detail-wax').val(data.wax)
        $('#detail-wash').val(data.wash)
        $('#detail-polish').val(data.polish)
        $('#detail-disinfection').val(data.disinfection)
      }
    }
  });
})

$('#modify-btn').click(function () {
  console.log('this is modify-btn')
  var phoneNo = $('#detail-phoneNo').val()
  var remark = $('#detail-remark').val()
  var plateNo = $('#detail-plateNo').val()
  var milage = $('#detail-milage').val()
  var wax = $('#detail-wax').val()
  var wash = $('#detail-wash').val()
  var polish = $('#detail-polish').val()
  var disinfection = $('#detail-disinfection').val()
  if ( !phoneNo ) { alert('手机号必须填写。');return; }
  var par = {
    'phoneNo': phoneNo, // 主键 手机号
    'remark': remark, // 备注 
    'plateNo': plateNo, // 车牌号
    'milage': milage, // 公里数
    'wax': wax, // 打蜡次数
    'wash': wash, // 精洗次数
    'polish': polish, // 抛光次数
    'disinfection': disinfection  // 车内消毒次数
  }
  $.ajax({
    type: 'post',
    url: api + 'modify',
    data: par,
    dataType: 'json',
    success: function(data) {
      console.log( data )
      if ( !!data.success ) {alert( data.success )}
      if ( !!data.error ) {alert( data.error )}
    }
  });
})

$('#query-all-btn').click(function () {
  console.log('this is query-all-btn')
  // var phoneNo = $('#query-phoneNo').val()
  // if ( !phoneNo ) { alert('手机号必须填写。');return; }
  var par = {
    // 'phoneNo': phoneNo // 主键 手机号
  }
  $.ajax({
    type: 'post',
    url: api + 'queryAll',
    data: par,
    dataType: 'json',
    success: function(data) {
      console.log( data )
      if ( !!data.success ) {alert( data.success )}
      if ( !!data.error ) {
        alert( data.error )
      } else {
        aaa = data
        var html = ''
        for ( var i=0, l=data.length; i<l; i++ ) {
          html += `
            <tr>
              <td>${i+1}</td>
              <td>${data[i].phoneNo}</td>
              <td>${data[i].remark}</td>
              <td>${data[i].plateNo}</td>
              <td>${data[i].milage}</td>
              <td>${data[i].wax}</td>
              <td>${data[i].wash}</td>
              <td>${data[i].polish}</td>
              <td>${data[i].disinfection}</td>
            </tr>
          `
        }
        
        $('#query-all-tbody').html(html)
      }
    }
  });
})

$('#wax-btn').click(function () {
  console.log('this is wax-btn')
  var phoneNo = $('#detail-phoneNo').val()
  var wax = $('#detail-wax').val()
  if ( !phoneNo ) { alert('手机号必须填写。');return; }
  if ( !(wax > '0') ) { alert('剩余次数不足。');return; }
  var par = {
    'phoneNo': phoneNo // 主键 手机号
  }
  $.ajax({
    type: 'post',
    url: api + 'wax',
    data: par,
    dataType: 'json',
    success: function(data) {
      console.log( data )
      if ( !!data.success ) {alert( data.success )}
      if ( !!data.error ) {alert( data.error )}
      $('#query-btn').trigger('click')
    }
  });
})

$('#wash-btn').click(function () {
  console.log('this is wash-btn')
  var phoneNo = $('#detail-phoneNo').val()
  var wash = $('#detail-wash').val()
  if ( !phoneNo ) { alert('手机号必须填写。');return; }
  if ( !(wash > '0') ) { alert('剩余次数不足。');return; }
  var par = {
    'phoneNo': phoneNo // 主键 手机号
  }
  $.ajax({
    type: 'post',
    url: api + 'wash',
    data: par,
    dataType: 'json',
    success: function(data) {
      console.log( data )
      if ( !!data.success ) {alert( data.success )}
      if ( !!data.error ) {alert( data.error )}
      $('#query-btn').trigger('click')
    }
  });
})

$('#polish-btn').click(function () {
  console.log('this is polish-btn')
  var phoneNo = $('#detail-phoneNo').val()
  var polish = $('#detail-polish').val()
  if ( !phoneNo ) { alert('手机号必须填写。');return; }
  if ( !(polish > '0') ) { alert('剩余次数不足。');return; }
  var par = {
    'phoneNo': phoneNo // 主键 手机号
  }
  $.ajax({
    type: 'post',
    url: api + 'polish',
    data: par,
    dataType: 'json',
    success: function(data) {
      console.log( data )
      if ( !!data.success ) {alert( data.success )}
      if ( !!data.error ) {alert( data.error )}
      $('#query-btn').trigger('click')
    }
  });
})

$('#disinfection-btn').click(function () {
  console.log('this is disinfection-btn')
  var phoneNo = $('#detail-phoneNo').val()
  var disinfection = $('#detail-disinfection').val()
  if ( !phoneNo ) { alert('手机号必须填写。');return; }
  if ( !(disinfection > '0') ) { alert('剩余次数不足。');return; }
  var par = {
    'phoneNo': phoneNo // 主键 手机号
  }
  $.ajax({
    type: 'post',
    url: api + 'disinfection',
    data: par,
    dataType: 'json',
    success: function(data) {
      console.log( data )
      if ( !!data.success ) {alert( data.success )}
      if ( !!data.error ) {alert( data.error )}
      $('#query-btn').trigger('click')
    }
  });
})

$('#log-btn').click(function () {
  console.log('this is log-btn')
  var phoneNo = $('#query-phoneNo').val()
  if ( !phoneNo ) { alert('手机号必须填写。');return; }
  var par = {
    'phoneNo': phoneNo // 主键 手机号
  }
  $.ajax({
    type: 'post',
    url: api + 'log',
    data: par,
    dataType: 'json',
    success: function(data) {
      console.log( data )
      if ( !!data.success ) {alert( data.success )}
      if ( !!data.error ) {
        alert( data.error )
      }
    }
  });
})