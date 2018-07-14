const querystring = require('querystring');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

var Astorm = require('Astorm.js');

exports.handler = (event, context, callback) => {
	var result = Astorm.Objects.DynamoDB.Result.basic(); // Response data

	// client로 부터 요청받은 파라미터
	var params = querystring.parse(event.bodyJson); // Form 형식으로 넘어올 경우.
	if( params.token == undefined) {
		params = event.bodyJson;
	}
	// 파라미터의 period
	var paramsPeriod = params.period;
	// 파라미터의 employeeNo
	var paramsEmployeeNo = params.employeeNo;
	var userName = undefined;

	// 사원 테이블 조회 실행
	queryDynamoDB({
		ExpressionAttributeValues: {
			":v1": { S: paramsEmployeeNo }
		}, 
		KeyConditionExpression: "employeeNo = :v1", 
		TableName: "Employee",
		IndexName : "employeeNo-index"
	}).then(employeeResult => { /// 사원 테이블 조회 성공
		// 사원이름 
		userName = employeeResult.Items[0].name.S;
		
		// 휴가 히스토리 조회 요청 데이터	
		var lVacationHistoryParams = {
			ExpressionAttributeValues: {
				":v1": { S: paramsEmployeeNo },
				":v2" : { S: paramsPeriod }
			}, 
			KeyConditionExpression: "employeeNo = :v1", 
			TableName: "VacationHistory",
			IndexName : "employeeNo-createAt-index",
			FilterExpression: "period = :v2",
			ScanIndexForward: false
		}
		if(params.vMainType){
			lVacationHistoryParams.ExpressionAttributeValues[":v3"] = { N: params.vMainType }
			lVacationHistoryParams.FilterExpression += ' and vMainType = :v3';
		}
		if(params.vSubType){
			lVacationHistoryParams.ExpressionAttributeValues[":v4"] = { N: params.vSubType }
			lVacationHistoryParams.FilterExpression += ' and vSubType = :v4';
		}
		if(params.vStatus){
			lVacationHistoryParams.ExpressionAttributeValues[":v5"] = { S: params.vStatus }
			lVacationHistoryParams.FilterExpression += ' and vStatus = :v5';
		}  

		// 휴가 히스토리 조회 요청
		queryDynamoDB(lVacationHistoryParams)
		.then(vacationHistoryResult => { // 휴가 히스토리 조회 성공]
			result.data = {
				vacationHistory: []
			}
			if(vacationHistoryResult.Count>0){
				var lPushObj;
				var vacationData;
				for(var i=0, endi = vacationHistoryResult.Count; i<endi; ++i){
					vacationData = vacationHistoryResult.Items[i];
					lPushObj = {
						vacationHistoryID: vacationData.vacationHistoryID.S,
						documentID: vacationData.documentID.S,
						employeeNo: vacationData.employeeNo.S,
						name: userName,
						startAt: vacationData.startAt.S,
						endAt: vacationData.endAt.S,
						vMainType: vacationData.vMainType.N,
						vSubType: vacationData.vSubType.N,
						vStatus: vacationData.vStatus.S,
						vCount: vacationData.vCount.N,
						createAt: vacationData.createAt.S
					}
					result.data.vacationHistory[i] = lPushObj;
				}
			}
			callback(null,result);
		}, 
		vacationHistoryQueryError => { // 휴가 히스토리 조회 실패
			Astorm.Objects.DynamoDB.Error.sys(vacationHistoryQueryError, callback)
		}); 
	}, 
	empoyeeError => { // 사원 테이블 조회 실패
		Astorm.Objects.DynamoDB.Error.sys(empoyeeError, callback)
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