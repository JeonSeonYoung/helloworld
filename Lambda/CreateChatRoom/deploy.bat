REM CreateChatRoom
  del CreateChatRoom.zip
  7z a CreateChatRoom.zip CreateChatRoom.js ../HelloWorld.js
  aws lambda update-function-code --region ap-northeast-2 --function-name CreateChatRoom --zip-file fileb://CreateChatRoom.zip
 