const pool = require("../db");
const jwt = require('jsonwebtoken');
const verifyToken = require("../middleware/verifyToken")

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

const addCards = (req, res)=>{

    const {text1, text2, description} = req.body
    const token = req.cookies.jwt;
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    jwt.verify(token, 'my_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token cant add card' });
        }
        console.log("decoded login_User:",decoded.login_User)
        const userLogin = decoded.login_User;
        pool.getConnection((err, connection)=>{
            if(err) throw err;
            // connection.query('INSERT INTO flashcards SET?', [req.body],(err, rows)=>{
            connection.query('INSERT INTO flashcards (text1, text2, description, login_User) VALUES (?, ?, ?, ?)', [text1, text2, description, userLogin],(err, rows)=>{
                connection.release();
    
                if(err) throw err;
                res.send(rows);
            })
        })
    
    })

}
// const addCards = (req, res)=>{
//     pool.getConnection((err, connection)=>{
//         if(err) throw err;
//         connection.query('INSERT INTO flashcards SET?', [req.body],(err, rows)=>{
//             connection.release();

//             if(err) throw err;
//             res.send(rows);
//         })
//     })
// }

module.exports = {getCards, addCards};