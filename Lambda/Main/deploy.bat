 REM SearchChatList
 del SearchChatList.zip
 7z a SearchChatList.zip SearchChatList.js ../HelloWorld.js
 aws lambda update-function-code --region ap-northeast-2 --function-name SearchChatList --zip-file fileb://SearchChatList.zip

 
 REM InterestList
 REM del InterestList.zip
 REM 7z a InterestList.zip InterestList.js ../HelloWorld.js
 REM aws lambda update-function-code --region ap-northeast-2 --function-name InterestList --zip-file fileb://InterestList.zip

 REM ChatList
 REM del ChatList.zip
 REM 7z a ChatList.zip ChatList.js ../HelloWorld.js
 REM  --function-name ChatList --zip-file fileb://ChatList.zip
