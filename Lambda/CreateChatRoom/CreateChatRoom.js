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

	var NOW_DATE = new Date();
	NOW_DATE = HelloWorld.Objects.Date.format(NOW_DATE,'yyyy-mm-dd hh:nn:ss');

	var userID = params.userID;
	var chatName = params.chatName;
	var createAt = NOW_DATE;
	var interestID = params.interestID;
	var masterNickName = params.masterNickName;
	var maxCost = params.maxCost;
	var vLocation = params.vLocation;
	
	console.log(userID);
	console.log(chatName);
	console.log(createAt);
	console.log(interestID);
	console.log(masterNickName);
	console.log(maxCost);
	console.log(vLocation);
	
	var inChatID;

	var promisChatInfo = () =>{
		return new Promise((resolve, reject) =>{
			HelloWorld.Objects.DynamoDB.Sequence.generator('ChatInfo').then((pResponse)=>{
				inChatID = pResponse;
				var inPutItem = {
					"chatID":{"S": inChatID},
					"chatName":{"S": chatName},
					"createAt":{"S": createAt},
					"currentCost":{"S": "1"},
					"interestID":{"S": interestID},
					"masterNickName":{"S": masterNickName},
					"maxCost":{"S": maxCost},
					"vLocation":{"S": vLocation},
					"vStatus":{"S": "T"},
					"masterUserID":{"S":userID}
				};
				dynamodb.putItem({
					"TableName": "ChatInfo",
					"Item" : inPutItem
				}, function(err, data) {
					if (err) {
						console.log('chat room add fail.: '+JSON.stringify(err, null, '  '));
						result.headers.resultCode = "400";
						result.headers.resultMessage = "chat room add fial";
						result.data = "fail";

						callback(null,result);		
					} else {
						console.log(inChatID);
						resolve(null, inChatID);
					}
				});
			});
		});
	};
	
	// memberInfo add
	var promisMemberInfo = (lChatID) =>{
		return new Promise((resolve, reject) =>{
			HelloWorld.Objects.DynamoDB.Sequence.generator('MemberInfo').then((pResponse)=>{
				console.log("memberID", pResponse);
				console.log("userID", userID);
				console.log("lChatID", lChatID);
				console.log("createAt", createAt);
				var inPutItem = {
					"memberID":{"S": pResponse},
					"createAt":{"S": createAt},
					"chatID":{"S": lChatID},
					"userID":{"S": userID},
					"vStatus":{"S": "T"}
				};
				dynamodb.putItem({
					"TableName": "MemberInfo",
					"Item" : inPutItem
				}, function(err, data) {
					if (err) {
						console.log('member add fail.: '+JSON.stringify(err, null, '  '));
						result.headers.resultCode = "400";
						result.headers.resultMessage = "member room add fial";
						result.data = "fail";

						callback(null,result);		
					} else {
						resolve(null, pResponse);
					}
				});
			});
		});
	}


	// userInfo update
	var promisUserInfo = (lChatID) =>{
		return new Promise((resolve, reject) =>{
			queryDynamoDB({
				ExpressionAttributeValues: {
					":v1": { "S": userID }
				}, 
				KeyConditionExpression: "userID = :v1", 
				TableName: "UserInfo",
				IndexName : "userID-createAt-index"
			}).then(lResult => {
				console.log(JSON.stringify(lResult));
				var lUserCreateAt = lResult.Items[0].createAt.S;
				var lChatData = JSON.parse(lResult.Items[0].chatList.S).id;
				var lInterestData = JSON.parse(lResult.Items[0].interest.S).id;
				console.log(lUserCreateAt);
				console.log(lChatData);
				lChatData.push(Number(lChatID));
				lInterestData.push(Number(interestID));
				console.log(lChatData);
				var lChatList = JSON.stringify({"id": lChatData});
				var lInterest = JSON.stringify({"id": lInterestData});
				console.log(lChatList);
				var params = {
					TableName: "UserInfo",
					Key:{
						"userID": {"S": userID},
						"createAt": {"S": lUserCreateAt}
					},
					UpdateExpression: "SET chatList = :v1, interest = :v2",
					ExpressionAttributeValues: {
						":v1": { "S": lChatList },
						":v2": { "S": lInterest }
					}
				}
				dynamodb.updateItem(params, function(err, data){    

					if (err) {
						console.log('fail: '+JSON.stringify(err, null, '  '));
						var inRet = HelloWorld.Objects.DynamoDB.Result.basic();
						inRet.headers.resultCode = "400";
						inRet.headers.resultMessage = "update fail..";
						inRet.data = "fail";

						callback(null,inRet);	
					} else {
						callback(null, result);
					}    
				
				}); 

			})
		});
	}


	function *gen(){
		var lChatID = yield promisChatInfo();
		console.log(inChatID);
		yield promisMemberInfo(inChatID);
		yield promisUserInfo(inChatID);
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