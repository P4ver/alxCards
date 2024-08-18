const jwt = require('jsonwebtoken')
const pool = require('../db');

const login = (req, res)=>{
    const { name, password } = req.body;

    pool.getConnection((err, connection)=>{
        if(err) throw err;
        const query = `SELECT * FROM user WHERE login_User =? AND password_User =?`;
        connection.query(query, [name, password],async (err, result)=>{
            connection.release();
             
            if (err) {
                return res.status(500).json({ message: 'Server Error \'Login\'' });
            }

            if (result.length === 0) {
                return res.status(401).json({message:"indentity incorrect"})
            }

            const {login_User, password_User} = result[0]
            
            console.log("result login : ",result)
            // console.log('login_User and password', login_User, password_User)

            const token = jwt.sign({login_User, password_User}, 'my_secret')
            res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 }) 
            res.json({message: 'Logged in successfully'})
        })
    })
}


const logout = (req, res) => {
    // Clear the cookie that holds the JWT
    res.clearCookie('jwt');
    res.json({ message: 'Logged out successfully' });
};


module.exports = {login, logout};

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const pool = require('../db');

// const login = (req, res) => {
//     const { name, password } = req.body;

//     pool.getConnection((err, connection) => {
//         if (err) throw err;
//         const query = `SELECT * FROM user WHERE login_User = ?`;
//         connection.query(query, [name], async (err, result) => {
//             connection.release();

//             if (err) {
//                 return res.status(500).json({ message: 'Server Error' });
//             }

//             if (result.length === 0) {
//                 return res.status(401).json({ message: 'Identity incorrect' });
//             }

//             const { login_User, password_User } = result[0];

//             console.log("result login : ", result);
//             console.log("result password : ", password);
//             console.log("result password_User : ", password_User);

//             // Compare the plain text password with the hashed password
//             const isPasswordValid = await bcrypt.compare(password, password_User);
//             console.log("isPasswordValid : ", isPasswordValid);
//             if (!isPasswordValid) {
//                 return res.status(401).json({ message: 'Identity incorrect' });
//             }

//             // Generate a JWT
//             const token = jwt.sign({ login_User }, 'my_secret', { expiresIn: '1d' });
//             res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 });
//             res.json({ message: 'Logged in successfully' });
//         });
//     });
// }

// module.exports = login;
