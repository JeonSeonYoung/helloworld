

var HelloWorld = {
	// 상수 관련
	Const: {
	},
	// 생성자 함수
	Classes: {		
		Queue: function(){
			return {
				data: [],
				push: function (pData) {
					var lObj = {};
					lObj['success'] = pData.success;
					lObj['fail'] = pData.fail ? pData.fail : function () { };
					this.data.push(lObj);
				},
				complete: function (pFlag) {                
					this.exe();
				},
				pop: function () {
					var data = this.data;
					if (data.length > 0) {
						data.splice(0, 1);
					}
				},
				exe: function () {
					var data = this.data;
					if (data.length > 0) {
						data[0].success();
						this.pop();
					}
				},
				exeSuccess: function () {
					var data = this.data;
					if (data.length > 0) {
						data[0].success();
						this.pop();
					}
				},
				exeFail: function () {
					var data = this.data;
					if (data.length > 0) {
						data[0].fail();
						this.pop();
					}
				}
			}
		}
	},
	// 객체 관련
	Objects: {
		// 빈 객체 확인
		isEmpty: function(pObject){
			if(typeof pObject !== 'object'){
				throw new Error('Not a Object');
			}
			var lToString = Object.prototype.toString;
			if(lToString.call(pObject) === '[object Object]'){
				return Object.keys(pObject).length > 0 ? false : true;
			}
			if(lToString.call(pObject) === '[object Array]'){
				return pObject.length > 0 ? false : true;
			}
		},
		// 문자열 관련
		String: {
			// 0 채우기
			fillZero: function(pStr, pWidth) {
				var lStr = String(pStr);
				var i = Number(pWidth) - lStr.length;
			
				for(; i > 0; --i) {
					lStr = '0' + lStr;
				}
			
				return lStr;
			},
			fixedNumber: function(pData){
				return Number(pData.toFixed(2));
			}
		},
		// 날짜 관련
		Date: {
			// 현재 시간 반환
			getNowDate: function(){
				return nowDate = new Date(Date.parse(new Date()) + (1000 * 60 * 60)*9);
			},
			// 날짜 포멧 변환
			format: function(pDate, pFormat) {
				if(pDate && !(pDate instanceof Date)) {
					pDate = new Date(pDate);
				}
				var fillZero = HelloWorld.Objects.String.fillZero;
			
				if(pDate && pFormat) {
					switch(pFormat) {
						case "yyyy-mm-ddThh:nn:ss":
							pDate = fillZero(pDate.getFullYear(), 4) + '-' + fillZero(pDate.getMonth() + 1, 2) + '-' + fillZero(pDate.getDate(), 2) + 'T' + fillZero(pDate.getHours(), 2) + ':' + fillZero(pDate.getMinutes(), 2) + ':' + fillZero(pDate.getSeconds(), 2);
							break;
						case "yyyy-mm-dd hh:nn:ss":
							pDate = fillZero(pDate.getFullYear(), 4) + '-' + fillZero(pDate.getMonth() + 1, 2) + '-' + fillZero(pDate.getDate(), 2) + ' ' + fillZero(pDate.getHours(), 2) + ':' + fillZero(pDate.getMinutes(), 2) + ':' + fillZero(pDate.getSeconds(), 2);
							break;
						case "yyyy-mm-dd hh:nn":
							pDate = fillZero(pDate.getFullYear(), 4) + '-' + fillZero(pDate.getMonth() + 1, 2) + '-' + fillZero(pDate.getDate(), 2) + ' ' + fillZero(pDate.getHours(), 2) + ':' + fillZero(pDate.getMinutes(), 2);
							break;
						case "yyyy-mm-dd":
							pDate = fillZero(pDate.getFullYear(), 4) + '-' + fillZero(pDate.getMonth() + 1, 2) + '-' + fillZero(pDate.getDate(), 2);
							break;
						case "yyyymmddhhnnss":
							pDate = fillZero(pDate.getFullYear(), 4) + fillZero(pDate.getMonth() + 1, 2) + fillZero(pDate.getDate(), 2) + fillZero(pDate.getHours(), 2) + fillZero(pDate.getMinutes(), 2) + fillZero(pDate.getSeconds(), 2);
							break;
						case "yyyymmdd":
							pDate = fillZero(pDate.getFullYear(), 4) + fillZero(pDate.getMonth() + 1, 2) + fillZero(pDate.getDate(), 2);
							break;
						default:
							break;
					}
				} else {
					pDate = "";
				}
			
				return pDate;
			},
			// 해당 년 월의 마지막 일
			getLastDate: function(pYear, pMonth) {
			return new Date(pYear, pMonth, 0).getDate();
			}
		},
		// DynamoDB 관련
		DynamoDB: {
			__setting: {
				Sequence: {
					dynamoDB: undefined,
					queryDynamoDB: undefined
				},
				Request: {
					hash: {}
				}
			},
			// 반환 결과 객체 기본 구조 반환
			Result: {
				basic: function(){
					// HelloWorld.Objects.DynamoDB.Error.basic
					return {
						headers : {
							resultCode : "0",
							resultMessage : "정상 처리",
							resultRedirectUrl : "",
							refresh : "Y",
							exceptionUrl : ""
						},
						data : "success"
					}
				}
			},
			// 에러 처리 
			Error: {
				// 시스템 에러
				sys: function(pResult, pCallback){
					// HelloWorld.Objects.DynamoDB.Error.sys
					var result = HelloWorld.Objects.DynamoDB.Result.basic();
					console.log('User Query Error: '+ JSON.stringify(pResult, null, '  '));
					// 여기에 들어온건.. 시스템 에러에 가까음.
					result.headers.resultCode = "200";
					result.headers.resultMessage = "시스템 에러 입니다. 관리자에게 문의해 주세요.";
					result.data = "fail";
					result.headers.refresh = "N";
					pCallback(null,result);
				}
			},
			// 시퀀스 관련
			Sequence: {
				// 시퀀스 생성
				generator: function(pTableCode, pPrefix){
					// HelloWorld.Objects.DynamoDB.Sequence.generator
					return new Promise(function (resolve, reject) {
						var lPrefix = pPrefix ? pPrefix : '';
						HelloWorld.Objects.DynamoDB.__setting.Sequence.queryDynamoDB({
							Limit:1,
							ExpressionAttributeValues: {
								":v1": { S: pTableCode }
							}, 
							KeyConditionExpression: "tableCode = :v1",
							TableName: "SequenceControl",
							IndexName : "tableCode-index",
							ScanIndexForward: false
						})
						.then(sequneceResult => {	
							console.log('sequnece Query Success: '+ JSON.stringify(sequneceResult, null, '  '));
							var tSequence;
							if(sequneceResult.Count == 0){	//처음 생성하는 테이블의 시퀀스
								//tSequence = lPrefix + "10000";
								tSequence = lPrefix + "1";
							}else{	//이미 생성된 테이블의 시퀀스를 가져온다.
								var lsq = sequneceResult.Items[0].tableSequence.S;
								if(lPrefix.length>0){
									lsq = Number(lsq.split(lPrefix)[1]) + 1;
								} else {
									lsq = Number(lsq) + 1;
								}
								tSequence = lPrefix + lsq;
							}
							//테이블에 시퀀스 값 저장하기
							HelloWorld.Objects.DynamoDB.__setting.Sequence.dynamoDB.putItem({
								"TableName": "SequenceControl",
								"Item" : {
									"tableCode": {"S": pTableCode },
									"tableSequence": {"S": tSequence }
								}
							}, function(err, data) {
								if (err) {
									console.log('시퀀스 등록 실패.: '+JSON.stringify(err, null, '  '));
									var inRet = HelloWorld.Objects.DynamoDB.Result.basic();
									inRet.headers.resultCode = "400";
									inRet.headers.resultMessage = "시퀀스 등록에 실패하였습니다.";
									inRet.headers.resultCode = "400";
									inRet.data = "fail";
									reject(inRet);
								}else{
									console.log("시퀀스 발행 성공");
									resolve(tSequence);
								}
							});
						})
						.catch((pError)=>{
							console.log(pError);
						})
					});
				},
				// 시퀀스 생성 - 리스트용
				generatorList: function(pTableCode, pPrefix, pLength){
					// HelloWorld.Objects.DynamoDB.Sequence.generator
					return new Promise(function (resolve, reject) {
						var lPrefix = (pPrefix==null) ? '' : pPrefix;
						HelloWorld.Objects.DynamoDB.__setting.Sequence.queryDynamoDB({
							Limit:1,
							ExpressionAttributeValues: {
								":v1": { S: pTableCode }
							}, 
							KeyConditionExpression: "tableCode = :v1",
							TableName: "SequenceControl",
							IndexName : "tableCode-index",
							ScanIndexForward: false
						})
						.then(sequneceResult => {	
							console.log('sequnece Query Success: '+ JSON.stringify(sequneceResult, null, '  '));
							var tSequence = [];
							var lastSeq;
							for(var i=1, endi=pLength; i<=endi; ++i){
								if(sequneceResult.Count == 0){	//처음 생성하는 테이블의 시퀀스
									//tSequence = lPrefix + "10000";
									tSequence.push(lPrefix + i);
								}else{	//이미 생성된 테이블의 시퀀스를 가져온다.
									var lsq = sequneceResult.Items[0].tableSequence.S;
									if(lPrefix.length>0){
										lsq = Number(lsq.split(lPrefix)[1]) + i;
									} else {
										lsq = Number(lsq) + i;
									}
									tSequence.push(lPrefix + lsq);
								}								
							}
							
							//테이블에 시퀀스 값 저장하기
							HelloWorld.Objects.DynamoDB.__setting.Sequence.dynamoDB.putItem({
								"TableName": "SequenceControl",
								"Item" : {
									"tableCode": {"S": pTableCode },
									"tableSequence": {"S": tSequence[tSequence.length-1] }
								}
							}, function(err, data) {
								if (err) {
									console.log('시퀀스 등록 실패.: '+JSON.stringify(err, null, '  '));
									var inRet = HelloWorld.Objects.DynamoDB.Result.basic();
									inRet.headers.resultCode = "400";
									inRet.headers.resultMessage = "시퀀스 등록에 실패하였습니다.";
									inRet.headers.resultCode = "400";
									inRet.data = "fail";
									reject(inRet);
								}else{
									console.log("시퀀스 발행 성공");
									resolve(tSequence);
								}
							});
						})
						.catch((pError)=>{
							console.log(pError);
						})
					});
				},
				set: function(pDynamodb, pQueryDynamoDB){
					HelloWorld.Objects.DynamoDB.__setting.Sequence.dynamoDB = pDynamodb;
					HelloWorld.Objects.DynamoDB.__setting.Sequence.queryDynamoDB = pQueryDynamoDB;
				}
			},
			// 요청
			Request: {
				// 데이터
				__dataStore : {},
				// 데이터 추가
				putData: function(pData){
					this.__dataStore[pData.key] = pData.data;
				},
				// 데이터 반환
				getData: function(pKey){
					if(this.__dataStore.hasOwnProperty(pKey)){
						return this.__dataStore[pKey];
					} else {
						return false;
					}
				},
				// 파라미터 반환
				getParam: function(pKey){
					var lData = HelloWorld.Objects.DynamoDB.__setting.Request.hash[pKey].params;
					if(lData){
						return lData;
					} else {
						return false;
					}
				},
				// request function 추가
				put: function(pRequestObject){
					let lDataStore = HelloWorld.Objects.DynamoDB.__setting.Request.hash;
					if(lDataStore.hasOwnProperty(pRequestObject.key)){
						console.error('이미 동일한 key가 존재함 요청 key : '+ pKey);
						return false;
					} else {
						lDataStore[pRequestObject.key] = {
							key: pRequestObject.key,
							request: pRequestObject.request
						};
					}
				},
				// request function 반환
				get: function(pKey){
					let lDataStore = HelloWorld.Objects.DynamoDB.__setting.Request.hash;
					if(lDataStore.hasOwnProperty(pKey)){
						return lDataStore[pKey];
					} else {
						console.error('존재하지 않는 key 요청 key : '+ pKey);
						return null;
					}
				},
				// request function 실행
				exe: function(pData){
					let lKey = pData.key;
					let lParams = pData.params
					let lRequestObject = this.get(lKey);
					
					if(lRequestObject){
						lRequestObject.params = lParams;
						return lRequestObject.request(lRequestData);
					} else {
						console.error('실행 실패 요청 key : '+ lKey);
						return false;
					}
				}
			}
		}
	},
	// 제너레이터
	Generator: {
		run : function(gen){
			var args = [].slice.call(arguments, 1), it;
			it = gen.apply(this, args);
			return Promise.resolve()
				.then(function handleNext(value){
					var next = it.next(value);
					return(function handleResult(next){
						if(next.done){
							return next.value;
						}else{
							return Promise.resolve(next.value)
								.then(
									handleNext,
									function handleErr(err){
										return Promise.resolve(
											it.throw(err)
										)
										.then(handleResult);
									}
								);
						}
					})(next);
				});
		}
	}
};

module.exports =HelloWorld;