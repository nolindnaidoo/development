Selenium.prototype.doRandomString = function( options, varName ) {

  var length = 8;
  var type   = 'alphanumeric';
  var o = options.split( '|' );
  for ( var i = 0 ; i < 2 ; i ++ ) {
      if ( o[i] && o[i].match( /^\d+$/ ) )
          length = o[i];

      if ( o[i] && o[i].match( /^(?:alpha)?(?:numeric)?$/ ) )
          type = o[i];
  }

  switch( type ) {
      case 'alpha'        : storedVars[ varName ] = randomAlpha( length ); break;
      case 'numeric'      : storedVars[ varName ] = randomNumeric( length ); break;
      case 'alphanumeric' : storedVars[ varName ] = randomAlphaNumeric( length ); break;
      default             : storedVars[ varName ] = randomAlphaNumeric( length );
  };

};

function randomNumeric ( length ) {
  return generateRandomString( length, '0123456789'.split( '' ) ); }

function randomAlpha ( length ) {
  var alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split( '' );
  return generateRandomString( length, alpha ); }

function randomAlphaNumeric ( length ) {
  var alphanumeric = '01234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split( '' );
  return generateRandomString( length, alphanumeric ); }

function generateRandomString( length, chars ) {
  var string = '';
  for ( var i = 0 ; i < length ; i++ )
      string += chars[ Math.floor( Math.random() * chars.length ) ];
  return string;
}

Selenium.prototype.doTypeRandomEmail = function(locator) {

  var element = this.page().findElement(locator);

  var now     = new Date(); 
  var year    = now.getFullYear();
  var month   = now.getMonth()+1; 
  var day     = now.getDate();
  var hour    = now.getHours();
  var minute  = now.getMinutes();
  var second  = now.getSeconds(); 
  if(month.toString().length == 1) {
      var month = '0'+month;
  }
  if(day.toString().length == 1) {
      var day = '0'+day;
  }   
  if(hour.toString().length == 1) {
      var hour = '0'+hour;
  }
  if(minute.toString().length == 1) {
      var minute = '0'+minute;
  }
  if(second.toString().length == 1) {
      var second = '0'+second;
  }   
  var dateTime = month + '' + day + '' + year + '' + hour + minute + second;   

  var qaEmail = "test";

  qaEmail += dateTime += "@mailinator.com";

  this.browserbot.replaceText(element, qaEmail); };

Selenium.prototype.doTypeRandomDOB = function(locator){
   var dates = new Date();
   var day = dates.getDate();
   if (day < 10){
       day = '0' + day;
   }
   month = dates.getMonth() + 1;
   if (month < 10){
       month = '0' + month;
   }
   var year = dates.getFullYear() -1 ;
   var prettyDay = month + '/' + day + '/' + year;
   this.doType(locator, prettyDay);
}

Selenium.prototype.doTypeRandomExpireDatePass = function(locator){
   var dates = new Date();
   var day = dates.getDate();
   if (day < 10){
       day = '0' + day +1;
   }
   month = dates.getMonth() + 2;
   if (month < 10){
       month = '0' + month;
   }
   var year = dates.getFullYear();
   var expireDay = month + '/' + day + '/' + year;
   this.doType(locator, expireDay);
}

Selenium.prototype.doTypeRandomExpireDateFail = function(locator){
   var dates = new Date();
   var day = dates.getDate();
   if (day < 10){
       day = '0' + day;
   }
   month = dates.getMonth() - 1;
   if (month < 10){
       month = '0' + month;
   }
 var year = dates.getFullYear();
 var prettyDay = month + '/' + day + '/' + year;
 this.doType(locator, prettyDay);
}

Selenium.prototype.doTypeRandomZipcode = function(locator){
   var zipcode = Math.floor(Math.random()*89999+10000);
   this.doType(locator, zipcode);
}

Selenium.prototype.doTypeRandomPhone = function(locator){
   var phone = Math.floor(1000000000 + Math.random() * 10000000000);
   this.doType(locator, phone);
}

Selenium.prototype.doTypeRandomID = function(locator){
   var state = "TX";
   var dl = "DL";
   var num = Math.floor(100000000 + Math.random() * 800000000);
   var idnum = state + ' ' + dl + ' ' + num;
   this.doType(locator, idnum);
}
