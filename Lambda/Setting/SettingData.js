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

	const lUserID = params.userID;

	// 유저 정보
	var promisUserInfo = () =>{
		return new Promise((resolve, reject) =>{
			queryDynamoDB({
				ExpressionAttributeValues: {
					":v1": { S: lUserID }
				}, 
				KeyConditionExpression: "userID = :v1", 
				TableName: "UserInfo",
				IndexName : "userID-createAt-index"
			}).then(lResult => {
				resolve(lResult);
			}, userInfoQueryError => {
				HelloWorld.Objects.DynamoDB.Error.sys(userInfoQueryError, callback);
			}); 
		});
	} 

    function* gen() {
		const userInfoList = yield promisUserInfo();
		
		var lResultList = [];

		lResultList.push({
			"nickName": userInfoList.Items[0].nickName.S,
			"distance": userInfoList.Items[0].distance.S,
			"lat": JSON.parse(userInfoList.Items[0].location.S).lat,
			"lng": JSON.parse(userInfoList.Items[0].location.S).lng,
            "interest": JSON.parse(userInfoList.Items[0].interest.S).id
		});
        callback(null, lResultList);
    }
    HelloWorld.Generator.run(gen);
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