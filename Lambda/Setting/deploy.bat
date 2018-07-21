 del SettingData.zip
 7z a SettingData.zip SettingData.js ../HelloWorld.js
 aws lambda update-function-code --region ap-northeast-2 --function-name SettingData --zip-file fileb://SettingData.zip