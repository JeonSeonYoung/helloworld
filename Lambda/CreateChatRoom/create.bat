7z a CreateChatRoom.zip CreateChatRoom.js 

aws lambda create-function --region ap-northeast-2 --function-name CreateChatRoom --zip-file fileb://CreateChatRoom.zip --role arn:aws:iam::024747744712:role/lambdaRole --handler CreateChatRoom.handler --runtime nodejs6.10