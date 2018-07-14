 del Test.zip
 7z a Test.zip Test.js ../HelloWorld.js
 aws lambda update-function-code --region ap-northeast-2 --function-name Test --zip-file fileb://Test.zip
