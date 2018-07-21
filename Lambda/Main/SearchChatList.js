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
	var promisUserInfo = new Promise((resolve, reject) =>{
			queryDynamoDB({
				ExpressionAttributeValues: {
					":v1": { S: lUserID }
				}, 
				KeyConditionExpression: "userID = :v1", 
				TableName: "UserInfo",
				IndexName : "userID-createAt-index"
			}).then(lResult => {
				var userResult = lResult.Items[0];
				var lUserInfo = {
					"location" : userResult.vLocation.S,
					"nickName" : userResult.nickName.S,
					"distance" : userResult.distance.S,
					"blockTf" : userResult.blockTf.S,
					"interest" : JSON.parse(userResult.interest.S).id
				}
				resolve(lUserInfo);
			}, userInfoQueryError => {
				HelloWorld.Objects.DynamoDB.Error.sys(userInfoQueryError, callback);
			}); 
		});
	 

	// 채팅방 정보
	var promisChatInfo = new Promise((resolve, reject)=>{
			let lRet = {
				ExpressionAttributeValues: {
					":v1": { S: "T"}
				}, 
				KeyConditionExpression: "vStatus = :v1", 
				TableName: "ChatInfo",
				IndexName : "vStatus-createAt-index"
			};
			if(params.chatName){
				lRet.ExpressionAttributeValues[":v2"] = { S: params.chatName };
				lRet.FilterExpression = "contains(chatName, :v2)";
			}
			queryDynamoDB(lRet).then(lResult => {
				var lChatInfo = [];
				for(var i=0; i<lResult.Count; ++i){
					lChatInfo.push({
						"chatID" : lResult.Items[i].chatID.S,
						"interestID" : lResult.Items[i].interestID.S,
						"masterUserID" : lResult.Items[i].masterUserID.S,
						"masterNickName" : lResult.Items[i].masterNickName.S,
						"location" : lResult.Items[i].vLocation.S,
						"maxCost" : lResult.Items[i].maxCost.S,
						"chatName" : lResult.Items[i].chatName.S
					})
				}
				 resolve(lChatInfo);
			}, chatQueryError => {
				HelloWorld.Objects.DynamoDB.Error.sys(chatQueryError, callback);
			}); 
		});
	

	// 관심분야 정보
	var promisInterestInfo =new Promise((resolve, reject)=>{
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
				resolve(lInterestList);
			}, interestQueryError => {
				HelloWorld.Objects.DynamoDB.Error.sys(interestQueryError, callback);
			}); 
		});
	

	Promise.all([promisUserInfo, promisChatInfo, promisInterestInfo]).then((values) =>{
		var lUserList = values[0];
		var lChatList = values[1];
		var lInterestList = values[2];
		
		var inRet = [];

		for(var i = 0; i<lChatList.length; ++i){
			for(var j = 0; j<lUserList.interest.length; ++j){
				if(lChatList[i].interestID == lUserList.interest[j]){
					for(var k = 0; k<lInterestList.length; ++k){
						if(lChatList[i].interestID == lInterestList[k].interestID){
							
							inRet.push({
								"nickName" : lUserList.nickName,
								"distance" : lUserList.distance,
								"interestID": lInterestList[k].interestID,
								"interestName": lInterestList[k].name,
								"masterUserID" : lChatList[i].masterUserID,
								"masterNickName" : lChatList[i].masterNickName,
								"location" : lChatList[i].vLocation,
								"chatName" : lChatList[i].chatName,
								"maxCost" : lChatList[i].maxCost
							})		
						}
					}
					
				}
			}
		}
		
		callback(null, inRet);
		
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