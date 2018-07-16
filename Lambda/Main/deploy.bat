 del ChatList.zip
 7z a ChatList.zip ChatList.js ../HelloWorld.js
 aws lambda update-function-code --region ap-northeast-2 --function-name ChatList --zip-file fileb://ChatList.zip
