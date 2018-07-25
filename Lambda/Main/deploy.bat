 REM DeleteDistance
  del DeleteDistance.zip
  7z a DeleteDistance.zip DeleteDistance.js ../HelloWorld.js
  aws lambda update-function-code --region ap-northeast-2 --function-name DeleteDistance --zip-file fileb://DeleteDistance.zip
 
 REM DeleteInterest
 REM del DeleteInterest.zip
 REM 7z a DeleteInterest.zip DeleteInterest.js ../HelloWorld.js
 REM aws lambda update-function-code --region ap-northeast-2 --function-name DeleteInterest --zip-file fileb://DeleteInterest.zip

 
 REM InterestAllList
 REM del InterestAllList.zip
 REM 7z a InterestAllList.zip InterestAllList.js ../HelloWorld.js
 REM aws lambda update-function-code --region ap-northeast-2 --function-name InterestAllList --zip-file fileb://InterestAllList.zip

 
 REM SearchChatList
 REM del SearchChatList.zip
 REM 7z a SearchChatList.zip SearchChatList.js ../HelloWorld.js
 REM aws lambda update-function-code --region ap-northeast-2 --function-name SearchChatList --zip-file fileb://SearchChatList.zip

 
 REM InterestList
 REM del InterestList.zip
 REM 7z a InterestList.zip InterestList.js ../HelloWorld.js
 REM aws lambda update-function-code --region ap-northeast-2 --function-name InterestList --zip-file fileb://InterestList.zip

 REM ChatList
 REM del ChatList.zip
 REM 7z a ChatList.zip ChatList.js ../HelloWorld.js
 REM aws lambda update-function-code --region ap-northeast-2 --function-name ChatList --zip-file fileb://ChatList.zip