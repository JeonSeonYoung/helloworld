REM MapUpdate
7z a MapUpdate.zip MapUpdate.js 
aws lambda create-function --region ap-northeast-2 --function-name MapUpdate --zip-file fileb://MapUpdate.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler MapUpdate.handler --runtime nodejs6.10