const pool = require("../db");

const getCards = (req, res)=>{
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        connection.query('SELECT * from flashcards', (err, rows)=>{
            connection.release();
            if(err) throw err;
            res.send(rows);
        })
    })
}

module.exports = getCards;