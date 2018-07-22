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


	// 관심분야 정보	
	queryDynamoDB({
		ExpressionAttributeValues: {
			":v1": { S: "T" }
		}, 
		KeyConditionExpression: "vStatus = :v1", 
		TableName: "InterestInfo",
		IndexName : "vStatus-index"
	}).then(lResult => {
		var lInterestList = [];
		for(var i=0; i<lResult.Count; ++i){
			lInterestList.push({
				"interestID":lResult.Items[i].interestID.S,
				"name":lResult.Items[i].name.S
			})
		}
		callback(null, lInterestList);
	}, interestQueryError => {
		HelloWorld.Objects.DynamoDB.Error.sys(interestQueryError, callback);
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