module.exports = {
    mysql : {
        development : {
            host                : '52.78.72.57',
            port                : 3306,
            user                : 'duke',
            password            : 'samadal',
            database            : 'group_chat',
            connectionLimit     :20,
            waitForConnections  :false
        },
        production : {
            host                : '52.78.72.57',
            port                : 3306,
            user                : 'duke',
            password            : 'samadal',
            database            : 'message',
            connectionLimit     :20,
            waitForConnections  :true
        },
        production : {
            host                : '52.78.72.57',
            port                : 3306,
            user                : 'duke',
            password            : 'samadal',
            database            : 'user_info',
            connectionLimit     :20,
            waitForConnections  :true
        }
    }
}