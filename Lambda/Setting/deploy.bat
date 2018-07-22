 del SettingData.zip
 7z a SettingData.zip SettingData.js ../HelloWorld.js
 aws lambda update-function-code --region ap-northeast-2 --function-name SettingData --zip-file fileb://SettingData.zip

 REM del SettingUpdate.zip
 REM 7z a SettingUpdate.zip SettingUpdate.js ../HelloWorld.js
 REM aws lambda update-function-code --region ap-northeast-2 --function-name SettingUpdate --zip-file fileb://SettingUpdate.zip