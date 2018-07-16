7z a ChatList.zip ChatList.js 

aws lambda create-function --region ap-northeast-2 --function-name ChatList --zip-file fileb://ChatList.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler ChatList.handler --runtime nodejs6.10
