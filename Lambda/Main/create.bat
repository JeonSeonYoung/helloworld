REM InterestList
7z a InterestList.zip InterestList.js 
aws lambda create-function --region ap-northeast-2 --function-name InterestList --zip-file fileb://InterestList.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler InterestList.handler --runtime nodejs6.10


REM ChatList
REM 7z a ChatList.zip ChatList.js 
REM aws lambda create-function --region ap-northeast-2 --function-name ChatList --zip-file fileb://ChatList.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler ChatList.handler --runtime nodejs6.10
