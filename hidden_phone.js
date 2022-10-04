/* var s = "10/  -08/ .2020. 09872 728 23 day ne"; */
/* var s = "Số điện thoại của mình là  0976.887.999. 438/16/45 doi can nhé 098.787.6545"; */
/* var s = "10  08  2020. 09872 728 23 day ne"; */
/* console.log(s.replace(/[0-9]/g, "*")); */
/* var s = "098.777.7777. xxxx"; */
/* var s = "so dien thoai la 0978. 438 doi can nhe. 0987 987 654 day nhe"; */
/* var s = "0987 6567 xxxx xxx 87 xxxx 098 8987 765 xxxx"; */
/* var s = "0987 6567 xxxx xxx 87 xxxx 098 8987 765 x. xxx 0988888 888"; */
/* var s = "0987 6567 xxxx xxx 87 xxxx 8888767654543234 x. xxx 0988888 888"; */
/* var s = "0987-   6567 xxxx xxx 87 xxxx 888876765. 4543234 xxxx. xxx .0988888 888"; */
var s = "8888888888888 097.999 99.     09 xxxxxx xxx";
var s = "8888888888888 097.999.9999. 09 xxxxxx xxx";
var s = "097.999.9998 097.999.9999. 09 xxxxxx xxx";
var s = "xxx 0979999998 0979999999. 09 xxxxxx xxx";
/* var s = "Địa chỉ của c là toà HH01A KĐT THANH HÀ. 0384468188"; */
/* var s = "Zalo dùng số điện thoại 0186500999"; */
/* var s = "098/289/1123. 0987876 654 xxxx"; */ 

var result = HidePhone(s);
console.log("result : "+result);

function HidePhone(s) {
	var rm = s.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g," ");
	return replacePhone(rm.split(" "), s);
}

function getPhoneVnValid(s) {
	var check;
	if (s.length==11) {
  	check = ["843", "845", "847", "848", "849"];
  } else if (s.length==10) {
  	check = ["03", "05", "07", "08", "09"];
  } else {
  	return false;
  }
  
  return check.some(function(curr, index, arr) {
  	if (s.indexOf(arr[index])==0) {
    	return true;
    }
  }, false);
}

function replacePhone(dataArr, originalString, from=0){
  var num = '';
  var milestone = from;
  var save = [];

  for (var i=from;i<dataArr.length;i++) {
    if (dataArr[i] != ''){
    	if (!isNaN(dataArr[i])) {
      	// kieu so
        num = num.concat(dataArr[i]);
        save.push(i); 
        if (num.length==10 || num.length==11) {
        	if (getPhoneVnValid(num)){
            var offsetStart=0;
            var offsetEnd=0;
            for (var j=0;j<save[0];j++) {
            	offsetStart += dataArr[j].length+1;
            }
            offsetEnd = offsetStart;
            for (var k=0;k<save.length;k++) {
            	offsetEnd += dataArr[save[k]].length+1;
            }
            // hide mobile
            originalString = originalString.substr(0,offsetStart) + "***********" + originalString.substr(offsetEnd,originalString.length);
            
            // cap nhat lai milestone hien tai
						milestone = i;
            // tiep tuc kiem tra tu i
            continue;
          } else {
						// tiep tuc tim kiem lai bat dau tu Milestone + 1
        		originalString = replacePhone(dataArr, originalString, milestone+1);
						break;
          }
        } else if (num.length>10){
          // tiep tuc tim kiem lai bat dau tu Mốc+1
          originalString = replacePhone(dataArr, originalString, milestone+1);
          save = [];
          break;
        }
       
      } else {
      	// phan tu hien tai không phải là số --> duyet lai tu i+1
        originalString = replacePhone(dataArr, originalString, i+1);
        save = [];
        break;
      }

    }
  }
  
	return originalString;
}