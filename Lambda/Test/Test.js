const querystring = require('querystring');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

var HelloWorld = require('HelloWorld.js');

exports.handler = (event, context, callback) => {
	var result = HelloWorld.Objects.DynamoDB.Result.basic(); // Response data

	// client로 부터 요청받은 파라미터
	var params = querystring.parse(event.bodyJson); // Form 형식으로 넘어올 경우.
	if( params.token == undefined) {
		params = event.bodyJson;
	}

	//  정보 요청
	var pUserInfo = new Promise(function(resolve, reject){
		queryDynamoDB({
			ExpressionAttributeValues: {
				":v1": { N: "1" }
			}, 
			KeyConditionExpression: "userID = :v1", 
			TableName: "UserInfo",
			IndexName : "userID-createDate-index",
		}).then(result => {
            console.log(JSON.stringify(result));
			resolve(result);
		}, userInfoQueryError => {
			HelloWorld.Objects.DynamoDB.Error.sys(userInfoQueryError, callback);
		}); 
    });
    
    // Promise all
	Promise.all([pUserInfo]).then(function(values){
		console.log("모두 완료함", values);
		result.data.userInfo = values[0];
		callback(null, result);
	});

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