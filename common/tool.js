const validatePhone = function(phone) {
		let mPattern = /^1[34578]\d{9}$/; 
		return mPattern.test(phone);
}

// 讲上传图片转换为 uni file picker 的value格式
// http://222.90.83.242:17007/motopark/moto/2021/07/29/2682ac4c-c18c-4039-ac07-5cd6b702c9fc.jpeg
// {
//      "name":"file.txt",
//      "extname":"txt",
//      "url":"https://xxxx",
//      // ...
//  }

const formatFile = function(fileUrl = "http://222.90.83.242:17007/motopark/moto/2021/07/29/2682ac4c-c18c-4039-ac07-5cd6b702c9fc.jpeg") {
	const arr = fileUrl.split("/");
	const fileFullname = arr[arr.length -1];
	const fileFullnameAry = fileFullname.split(".");
	const name = fileFullname;
	const extname = fileFullnameAry[1];
	return {
		name,
		extname,
		url: fileUrl
	}
}

export default {
	validatePhone,
	formatFile,
}