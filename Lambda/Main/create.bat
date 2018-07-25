REM DeleteDistance
7z a DeleteDistance.zip DeleteDistance.js 
aws lambda create-function --region ap-northeast-2 --function-name DeleteDistance --zip-file fileb://DeleteDistance.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler DeleteDistance.handler --runtime nodejs6.10

REM DeleteInterest
REM 7z a DeleteInterest.zip DeleteInterest.js 
REM aws lambda create-function --region ap-northeast-2 --function-name DeleteInterest --zip-file fileb://DeleteInterest.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler DeleteInterest.handler --runtime nodejs6.10

REM InterestAllList
REM 7z a InterestAllList.zip InterestAllList.js 
REM aws lambda create-function --region ap-northeast-2 --function-name InterestAllList --zip-file fileb://InterestAllList.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler InterestAllList.handler --runtime nodejs6.10

REM SearchChatList
REM 7z a SearchChatList.zip SearchChatList.js 
REM aws lambda create-function --region ap-northeast-2 --function-name SearchChatList --zip-file fileb://SearchChatList.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler SearchChatList.handler --runtime nodejs6.10


REM InterestList
REM 7z a InterestList.zip InterestList.js 
REM aws lambda create-function --region ap-northeast-2 --function-name InterestList --zip-file fileb://InterestList.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler InterestList.handler --runtime nodejs6.10

REM ChatList
REM 7z a ChatList.zip ChatList.js 
REM aws lambda create-function --region ap-northeast-2 --function-name ChatList --zip-file fileb://ChatList.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler ChatList.handler --runtime nodejs6.10
