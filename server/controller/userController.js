const pool = require('../db');

const getUsers = (req, res)=>{
    pool.getConnection((err, connection)=>{
        // console.log("tes")
        if(err) throw err;
        connection.query('SELECT * from user', (err, rows)=>{
            connection.release();
            if(err) throw err;
            res.send(rows);
        })
    })
}

module.exports = getUsers;