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

	// 관심분야 정보
	var promisInterestInfo =(lInterestID) =>{
			return new Promise((resolve, reject)=>{
			queryDynamoDB({
				ExpressionAttributeValues: {
					":v1": { S: lInterestID }
				}, 
				KeyConditionExpression: "interestID = :v1", 
				TableName: "InterestInfo",
				IndexName : "interestID-index"
			}).then(lResult => {
				resolve(lResult);
			}, interestQueryError => {
				HelloWorld.Objects.DynamoDB.Error.sys(interestQueryError, callback);
			}); 
		});
	}


	function *genInterestArr(interestArr){
		const interestList = [];
		for(var i = 0; i<interestArr.length; ++i){
			var interestInfoData = yield promisInterestInfo(String(interestArr[i]));
			interestList.push(interestInfoData);
		};
		return interestList;
	}

	function *gen(){
		const userInfoList = yield promisUserInfo();
		const interestArr = JSON.parse(userInfoList.Items[0].interest.S).id;
		const interestInfo = yield *genInterestArr(interestArr);

		var lResultList = {
			"distance":userInfoList.Items[0].distance.S,
			"interestData" : []
		};
		for(var lData of interestInfo){
			lResultList.interestData.push({
				"interestID":lData.Items[0].interestID.S,
				"name":lData.Items[0].name.S
			})
		}
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