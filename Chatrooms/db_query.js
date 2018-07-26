//DB config 
var mysql      = require('mysql');
var dbconfig   = require('./db_config.js');
var connection = mysql.createConnection(dbconfig);


    //기본 방정보 넣어주기
    function room_insert(req, res){
        //chatID,currentCost,maxCost,vStatus
        connection.query('insert into ChatRoomDB (chatID, currentCost, maxCost,vStatus) value({0},{1},{2}, true)', 
        req.chatID,req.currentCost,req.maxCost,

        function(err, rows) {
          if(err) throw err;
      
          res.send(rows);
        });
      };
      

    //해당방에 유저 add 발생시 한명씩 늘려줘야함
    function count_up(req, res){
                connection.query('update ChatRoomDB set currentCost = currentCost +1 where  chatID = {0}', 
                req.chatID,

                function(err, rows) {
                  if(err) throw err;
              
                  res.send(rows);
                });
              };
    
    
    //방장이 나가면 방폭
     function room_del(req, res){
                connection.query('update ChatRoomDB set vStatus = {0} , masterID = 0 where  chatID <= {1}' , false,req.chatID,
                function(err, rows) {
              
                  res.send(rows);
                });
              };

    //현재 방정보 select 
    function room_select(req, res){
        connection.query('select * from ChatRoomDB where chatID = {0}' , req.chatID,
        function(err, rows) {
      
          res.send(rows);
        });
      };
