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

	// 채팅방 정보
	var promisChatInfo =(lChatID) =>{
			return new Promise((resolve, reject)=>{
			queryDynamoDB({
				ExpressionAttributeValues: {
					":v1": { S: lChatID }
				}, 
				KeyConditionExpression: "chatID = :v1", 
				TableName: "ChatInfo",
				IndexName : "chatID-createAt-index"
			}).then(lResult => {
				resolve(lResult);
			}, chatQueryError => {
				HelloWorld.Objects.DynamoDB.Error.sys(chatQueryError, callback);
			}); 
		});
	} 

	function *genChatRoomArr(chatArr){
		const chatList = [];
		for(var id of chatArr){
			var chatInfoData = yield promisChatInfo(String(id));
			chatList.push(chatInfoData);
		};
		return chatList;
	}

	function *gen(){
		const userInfoList = yield promisUserInfo();
		const chatArr = JSON.parse(userInfoList.Items[0].chatList.S).id;
		const chatRoomInfo = yield *genChatRoomArr(chatArr);
		//const interestInfo = yield *genInterestArr(chatRoomInfo);

		var lResultList = [];
		for(var lData of chatRoomInfo){
			for(var inData of chatRoomInfo){
                if (inData.Items[0].chatID.S === lData.Items[0].chatID.S){
                    lResultList.push({
                        "chatID": lData.Items[0].chatID.S,
						"chatName":lData.Items[0].chatName.S,
                        "masterNickName": lData.Items[0].masterNickName.S,
                        "currentCost": lData.Items[0].currentCost.S,
						"maxCost":lData.Items[0].maxCost.S,

					})
				}
			}
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