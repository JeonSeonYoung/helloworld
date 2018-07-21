 REM MapUpdate
 del MapUpdate.zip
 7z a MapUpdate.zip MapUpdate.js ../HelloWorld.js
 aws lambda update-function-code --region ap-northeast-2 --function-name MapUpdate --zip-file fileb://MapUpdate.zip