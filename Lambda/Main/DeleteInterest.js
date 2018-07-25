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

    const lInterestID = params.interestID;
    const lUserID = params.userID;
    
    // 유저의 관심분야 가져오기	
    queryDynamoDB({
        ExpressionAttributeValues: {
            ":v1": { S: lUserID }
        }, 
        KeyConditionExpression: "userID = :v1", 
        TableName: "UserInfo",
        IndexName : "userID-createAt-index"
    }).then(lResult => {
        var lUserInterest = JSON.parse(lResult.Items[0].interest.S).id;
        var lInterest = [];
        for(var i = 0; i<lUserInterest.length; ++i){
            if(lUserInterest[i] != lInterestID){
                lInterest.push(lUserInterest[i]);
            }
        }
        var paramInterest = {"id" : lInterest}

        var params = {
            TableName: "UserInfo",
            Key:{
                "userID": {S: lUserID},
                "createAt": {S: lResult.Items[0].createAt.S}
            },
            UpdateExpression: "SET interest = :v1",
            ExpressionAttributeValues: {
                ":v1": { S: JSON.stringify(paramInterest) }
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
                callback(null, lInterest);
            }    
        
        }); 

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