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
	const lCurrentPage = params.currentPage;

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
				};
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
				IndexName : "vStatus-createAt-index",
				ScanIndexForward: false
			};
			// if(params.chatName){
			// 	lRet.ExpressionAttributeValues[":v2"] = { S: params.chatName };
			// 	lRet.FilterExpression = "contains(chatName, :v2)";
			// }
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
					});
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
					});
				}
				resolve(lInterestList);
			}, interestQueryError => {
				HelloWorld.Objects.DynamoDB.Error.sys(interestQueryError, callback);
			}); 
		});
	

	Promise.all([promisUserInfo, promisChatInfo, promisInterestInfo]).then((values) =>{
		var lChatList = [];
		var lUserList = values[0];
		var lAllChatList = values[1];
		var lInterestList = values[2];
		
		// 검색도 어쩔수 없이 여기서..
		// 검색어 있을 경우
		if(params.chatName){
			for(var i = 0; i<lAllChatList.length; ++i){
				var index = lAllChatList[i].chatName.indexOf(params.chatName);
				if(index > -1){
					lChatList.push({
						"chatID" : lAllChatList[i].chatID,
						"interestID" : lAllChatList[i].interestID,
						"masterUserID" : lAllChatList[i].masterUserID,
						"masterNickName" : lAllChatList[i].masterNickName,
						"location" : lAllChatList[i].vLocation,
						"maxCost" : lAllChatList[i].maxCost,
						"chatName" : lAllChatList[i].chatName
					});
				}
			}
		}else{	// 검색어 없을 경우
			lChatList = lAllChatList;
		}
		
		// 거리 검색
		function calcDistance(lat1, lon1, lat2, lon2){
        var EARTH_R, Rad, radLat1, radLat2, radDist; 
	        var distance, ret;
	
	        EARTH_R = 6371000.0;
	        Rad = Math.PI/180;
	        radLat1 = Rad * lat1;
	        radLat2 = Rad * lat2;
	        radDist = Rad * (lon1 - lon2);
	        
	        distance = Math.sin(radLat1) * Math.sin(radLat2);
	        distance = distance + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radDist);
	        ret = EARTH_R * Math.acos(distance);
	
	        return  Math.round(Math.round(ret) / 1000);
	    }

		console.log("관심분야 검색");
		console.log(lUserList.interest);
		var lUserInterestList = [];
		console.log(lUserList.interest.length);
		if(lUserList.interest.length > 0){
			console.log("통과");
			for(var j = 0; j<lUserList.interest.length; ++j){
				for(var k = 0; k<lInterestList.length; ++k){
					if(lUserList.interest[j] == lInterestList[k].interestID){
						console.log(lUserList.interest[j]);
						console.log( lInterestList[k].interestID);
						console.log(lUserList.interest[j] == lInterestList[k].interestID);
						lUserInterestList.push({
							"interestID":lInterestList[k].interestID,
							"name":lInterestList[k].name
						});
					}
					
				}
			}
			lInterestList = lUserInterestList;
		}

		console.log(lInterestList);
		console.log(lChatList);

		var inRet = [];
		for(var c = 0; c<lChatList.length; ++c){
			for(var m = 0; m<lInterestList.length; ++m){
				if(lChatList[c].interestID == lInterestList[m].interestID){
					inRet.push({
						"nickName" : lUserList.nickName,
						"distance" : lUserList.distance,
						"userLocation" : lUserList.location,
						"interestID": lInterestList[m].interestID,
						"interestName": lInterestList[m].name,
						"masterUserID" : lChatList[c].masterUserID,
						"masterNickName" : lChatList[c].masterNickName,
						"chatLocation" : lChatList[c].location,
						"chatName" : lChatList[c].chatName,
						"maxCost" : lChatList[c].maxCost
					});
				}
			}	
		}
		
		console.log("위치 검색");
		console.log(JSON.parse(lUserList.location));
		console.log(inRet);
		var inList = [];
		if(lUserList.distance != -1){
			var userDistance = JSON.parse(lUserList.location);
			var lat1 = userDistance.lat;
			var lng1 = userDistance.lng;
			var dist;
			for(var q = 0; q<inRet.length; ++q){
				var chatDistance = JSON.parse(inRet[q].chatLocation);
				dist = calcDistance(lat1, lng1, chatDistance.lat, chatDistance.lng);
				console.log(Math.abs(dist));
				console.log("*****",lUserList.distance);
				if(lUserList.distance >= Math.abs(dist)){
					console.log("통과", inRet[q]);
					inList.push({
						"nickName" : inRet[q].nickName,
						"distance" : inRet[q].distance,
						"userLocation" : inRet[q].userLocation,
						"interestID": inRet[q].interestID,
						"interestName": inRet[q].name,
						"masterUserID" : inRet[q].masterUserID,
						"masterNickName" : inRet[q].masterNickName,
						"chatLocation" : inRet[q].chatLocation,
						"chatName" : inRet[q].chatName,
						"maxCost" : inRet[q].maxCost
					});
				}
			}
		}else{
			inList = inRet;
		}
		
		
		console.log("***********", inList);				
		console.log("페이징 처리 시작");
		var inChatRoomList = [];
		var lTotalCount = inList.length;
		console.log(lCurrentPage);
		console.log(lTotalCount);
		// 어쩔수없이 페이징 처리를 여기서..
		if(lTotalCount >= lCurrentPage){
			console.log(lCurrentPage);
			for(var p = lCurrentPage-1; p<lCurrentPage; ++p ){
				console.log(inList[p]);
				inChatRoomList.push(inList[p]);
			}
		}
		
		
		
		callback(null, inList);
		
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