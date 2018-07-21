 REM InterestList
 del InterestList.zip
 7z a InterestList.zip InterestList.js ../HelloWorld.js
 aws lambda update-function-code --region ap-northeast-2 --function-name InterestList --zip-file fileb://InterestList.zip

 REM ChatList
 REM del ChatList.zip
 REM 7z a ChatList.zip ChatList.js ../HelloWorld.js
 REM  --function-name ChatList --zip-file fileb://ChatList.zip
