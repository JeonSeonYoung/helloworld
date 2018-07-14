7z a Test.zip Test.js 

aws lambda create-function --region ap-northeast-2 --function-name Test --zip-file fileb://Test.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler Test.handler --runtime nodejs6.10
