7z a SettingData.zip SettingData.js 

aws lambda create-function --region ap-northeast-2 --function-name SettingData --zip-file fileb://SettingData.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler SettingData.handler --runtime nodejs6.10

REM 7z a SettingUpdate.zip SettingUpdate.js 

REM aws lambda create-function --region ap-northeast-2 --function-name SettingUpdate --zip-file fileb://SettingUpdate.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler SettingUpdate.handler --runtime nodejs6.10