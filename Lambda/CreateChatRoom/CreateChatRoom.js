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

	getDate = () => {
		var date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		var yyyy = date.getFullYear();

		return yyyy + "-" + mm + "-" + dd;
	}

	var userID = params.userID;
    var chatID = params.chatID;
	var chatName = params.chatName;
	var createAt = getDate();
	var interestID = params.interestID;
	var masterNickName = params.masterNickName;
	var maxCost = params.maxCost;
	var vLocation = params.vLocation;

	var sequenceControlData = {
		ExpressionAttributeValues: {
			":v1": { S: tableCode }
		},
		KeyConditionExpression: "tableCode = :v1",
		TableName: "UserInfo",
		IndexName: "tableCode-index"
	}

	var promisSequenceControl = () =>{
		return new Promise((resolve, reject) =>{
			queryDynamoDB(sequenceControlData)
				.then(lResult => {
					resolve(lResult);
				}, userInfoQueryError => {
					HelloWorld.Objects.DynamoDB.Error.sys(userInfoQueryError, callback);
				}); 
		});
	} 

	var sequenceParams = {
			TableName: "SequenceControl",
			Item: {
				"ChatInfo": 			{S: chatID},
				"InterestInfo": 		{S: chatName},
				"MemberInfo": 		{S: createAt},
				"UserInfo": 		{S: "1"}
			}
	}

	var chatParams = {
		TableName: "ChatInfo",
		Item: {
			"chatID": 			{S: chatID},
			"chatName": 		{S: chatName},
			"createAt": 		{S: createAt},
			"currentCost": 		{S: "1"},
			"interestID": 		{S: interestID},
			"masterNickName": 	{S: masterNickName},
			"maxCost": 			{S: maxCost},
			"vLocation": 		{S: vLocation},
			"vStatus": 			{S: "T"}
		}
	}

	function addChatRoom (err, data){
		if (err) {
			console.log('DOCUMENT 정보 수정 실패.: '+JSON.stringify(err, null, '  '));
			var inRet = HelloWorld.Objects.DynamoDB.Result.basic();
			inRet.headers.resultCode = "400";
			inRet.headers.resultMessage = "문서 수정에 실패하였습니다.";
			inRet.data = "fail";

			callback(null,inRet);	
		} else {
			console.log('EndpointArn Saved successful');
			result.data = "chatID: " + chatID + " chatName: " + chatName + " createAt: " + createAt + "\n" +
							" currentCost: " + "1" + " interestID: " + interestID + "\n masterNickName: " + masterNickName +
							" maxCost: " + maxCost + " vLocation: " + vLocation + " vStatus: " + "T";
			callback(null,result);
		}
	}

	dynamodb.putItem(chatParams, addChatRoom)
	dynamodb.updateItem()

	var memberParams = {
		TableName: "MemberInfo",
		Item: {
            "memberID": {S: memberID},
			"createAt": {S: createAt},
			"chatID": 	{S: chatID},
			"userID": 	{S: userID},
			"vStatus": 	{S: "T"}
        }
	}

	function addMemberByChatID (err, data){
		if (err) {
			console.log('DOCUMENT 정보 수정 실패.: '+JSON.stringify(err, null, '  '));
			var inRet = HelloWorld.Objects.DynamoDB.Result.basic();
			inRet.headers.resultCode = "400";
			inRet.headers.resultMessage = "문서 수정에 실패하였습니다.";
			inRet.data = "fail";

			callback(null,inRet);	
		} else {
			console.log('EndpointArn Saved successful');
			result.data = "memberID: " + memberID + "createAt: " + createAt +
							"chatID: " + chatID + "userID: " + userID;
			callback(null,result);
		}
	}

	dynamodb.putItem(memberParams, addMemberByChatID)

	var userParams = {
		TableName: "UserInfo",
		Key:{
            "userID": {S: userID},
            "createAt": {S: createAt}
        },
		UpdateExpression: "SET chatList = :v1",
		ExpressionAttributeValues: {
			":v1": { S: String(chatList) }
		}
	}

	var userData = {
		ExpressionAttributeValues: {
			":v1": { S: lUserID }
		},
		KeyConditionExpression: "userID = :v1",
		TableName: "UserInfo",
		IndexName: "userID-createAt-index"
	}

	// 유저 정보
	var promisUserInfo = () =>{
		return new Promise((resolve, reject) =>{
			queryDynamoDB(userData).then(lResult => {
				resolve(lResult);
			}, userInfoQueryError => {
				HelloWorld.Objects.DynamoDB.Error.sys(userInfoQueryError, callback);
			}); 
		});
	} 

	function updateMasterInfo (err, data){
		if (err) {
			console.log('DOCUMENT 정보 수정 실패.: '+JSON.stringify(err, null, '  '));
			var inRet = HelloWorld.Objects.DynamoDB.Result.basic();
			inRet.headers.resultCode = "400";
			inRet.headers.resultMessage = "문서 수정에 실패하였습니다.";
			inRet.data = "fail";

			callback(null,inRet);	
		} else {
			console.log('EndpointArn Saved successful');
			callback(null,result);
		}
	}

	dynamodb.updateItem(userParams, updateMasterInfo)
	console.log("params------", params);
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