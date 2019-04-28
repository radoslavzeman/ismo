const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
var bodyParser = require("body-parser");


const app = express();


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
})

con.connect(err => {
    if(err) {
        console.log("NEuspesne pripojeny na server")
        return err;
    }
    else {
        console.log("uspesne pripojeny na server")
    }
})

con.query('SELECT * FROM persons WHERE user_name = ?;', ['johnd'], (error, results, fields) => {
    if (error) {
      console.error('An error occurred while executing the query')
      throw error
    }
    console.log(results)
  })

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send('na zobrazenie vsetkych osob chod na /persons')
})

app.get('/persons', (req, res) => {
    var sql = 'SELECT * FROM persons;';
    con.query(sql, (error, results, fields) => {
        if(error) {
            return res.send(error)
        } else {
            return res.send(results)
        }
    })
})

// app.get('/loginjohn', (req, res) => {
//     var sql = 'SELECT * FROM persons WHERE user_name = ?;';
//     con.query(sql, ['johnd'], (error, results, fields) => {
//         if(error) {
//             return res.send(error)
//         } else {
//             return res.send(results)
//         }
//     })
// })

// app.post('/loginjohn', (req, res) => {
//     var sql = 'SELECT * FROM persons WHERE user_name = ?;';
//     con.query(sql, [req.body.user_name], (error, results, fields) => {
//         if(error) {
//             return res.send(error)
//         } else {
//             return res.send(results)
//         }
//     })
// })

app.post('/login', (req, res) => {
    var sql = 'SELECT * FROM persons WHERE user_name = ?;';
    con.query(sql, [req.body.user_name], (error, results, fields) => {
        if(error) {
            return res.send({msg: "err", error: error})
        } else {
            // var results_count = results.length;
            // console.log(results_count);
            // if (results_count === 0) {
            //     return res.send({msg: "user_not_exists"});
            // }
            // else if (results_count > 1) {
            //     return res.send({msg: "multiple_users_with_same_user_name"});
            // }
            // else {
            //     var user = results[0];
            //     //   var sol = results[0].sol;
            //     //   var hesloASol = req.body.heslo + sol;
            //     //   var hash = crypto.createHash('sha256').update(hesloASol).digest('base64');
            //     var hash = req.body.password;
            //     if (hash === user.password) {
            //         return res.send({msg: "ok", user: user});
            //     }
            //     else {
            //         return res.send({msg: "wrong_password"});
            //     }
            // }
            return res.send(results[0])
        }
    })
})

app.post('/get-person', (req, res) => {
    var sql = 'SELECT * FROM persons WHERE id = ?;';
    con.query(sql, [req.body.id], (error, results, fields) => {
        if(error) {
            return res.send({msg: "err", error: error})
        } else {
            var results_count = results.length;
            console.log(results_count);
            if (results_count === 0) {
                return res.send({msg: "person_not_exists"});
            }
            else if (results_count > 1) {
                return res.send({msg: "multiple_persons_with_same_id"});
            }
            else {
                var person = results[0];
                return res.send({msg: "ok", person: person});
            }
        }
    })
})

app.post('/add-person', (req, res) => {
    var sql = 'INSERT INTO persons (name, surname) VALUES (?, ?);';
    var person = req.body;
    console.log(person);
    con.query(sql, [person.name, person.surname], (error, results, fields) => {
        if(error) {
            return res.send({ msg: "err", error: error });
        } else {
            return res.send({ msg: "Osoba pridana"});
        }
    })
})

app.post('/update-person', (req, res) => {
    var sql = 'UPDATE persons SET name = ?, surname = ? WHERE id = ?;';
    var person = req.body;
    console.log(person);
    con.query(sql, [person.name, person.surname, person.id], (error, results, fields) => {
        if(error) {
            return res.send({ msg: "err", error: error });
        } else {
            return res.send({ msg: "Osoba upravena"});
        }
    })
})

//   })

// app.get('/user/add', (req, res) => {
//     const{ nome, sobrenome, email } = req.query
//     const INSERT_USER_QUERY = `INSERT INTO usuarios(nome, sobrenome, email) VALUES('${nome}', '${sobrenome}', '${email}')`
//     connection.query(INSERT_USER_QUERY, (err, resultados) => {
//         if(err) {
//             return res.send(err)
//         } else {
//             return res.send('usuario adicionado com sucesso')
//         }
//     })
// })


app.listen(4000, () => {
    console.log('server bezi na porte 4000')
})