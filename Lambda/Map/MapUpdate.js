const querystring = require('querystring');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
var HelloWorld = require('HelloWorld.js');

HelloWorld.Objects.DynamoDB.Sequence.set(dynamodb, queryDynamoDB);

exports.handler = (event, context, callback) => {	
	var result = HelloWorld.Objects.DynamoDB.Result.basic(); // Response data
	
	var params = querystring.parse(event.bodyJson); // Form 형식으로 넘어올 경우.
	if( params.token == undefined) {
		params = event.bodyJson;
	}

    var userID = params.userID;
    var createAt = params.createAt;

    var lat = params.lat;
    var lng = params.lng;
    var vLocation = JSON.stringify({lat : lat, lng : lng});

	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	nowDate = HelloWorld.Objects.Date.format(nowDate,'yyyy-mm-dd hh:nn:ss');	

	var params = {
		TableName: "UserInfo",
		Key:{
            "userID": {S: userID},
            "createAt": {S: createAt}
        },
		UpdateExpression: "SET vLocation = :v1",
		ExpressionAttributeValues: {
			":v1": { S: String(vLocation) }
		}
	}
	
	console.log("params------", params);

	dynamodb.updateItem(params, function(err, data){

		if (err) {
			console.log('DOCUMENT 정보 수정 실패.: '+JSON.stringify(err, null, '  '));
			var inRet = HelloWorld.Objects.DynamoDB.Result.basic();
			inRet.headers.resultCode = "400";
			inRet.headers.resultMessage = "문서 수정에 실패하였습니다.";
			inRet.data = "fail";

			callback(null,inRet);	
		} else {
			console.log('EndpointArn Saved successful');
			result.data = vLocation;
			callback(null,result);
		}
	})
};

/**
 * 
 * @param {*} pQueryParams 
 */
function queryDynamoDB(pQueryParams) {
	console.log("Query from dynamoDB ", pQueryParams)
	return new Promise((resolve, reject)=> {
		dynamodb.query( pQueryParams, function(err, data) {
			//console.log(JSON.stringify(data));
			if (err) {
				console.log(err);
				reject('error');
			}
			else {
				resolve(data);
			}
		});
	});
}