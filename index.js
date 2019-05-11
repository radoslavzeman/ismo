const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
var bodyParser = require("body-parser");
const path = require('path');
const port = process.env.PORT || 4000;

const app = express();


const con = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: 'root',
    // database: 'test',
    host: 'remotemysql.com',
    post: 3306,
    user: 'PBA2P26b6c',
    password: 'flKqKAFVJw',
    database: 'PBA2P26b6c',
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

// con.query('SELECT * FROM persons WHERE user_name = ?;', ['johnd'], (error, results, fields) => {
//     if (error) {
//       console.error('An error occurred while executing the query')
//       throw error
//     }
//     var person = results[0];
//     // var d = new Date(person.date_of_birth);
//     // person.date_of_birth = moment(d).format('YYYY/MM/DD'); //d.getFullYear() + '-' + d.getDate() + '-' + d.getDay();
//     console.log(person);
//     // console.log(results)
//   })

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send('root route');
})

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})


app.post('/login', (req, res) => {
    var sql = 'SELECT * FROM persons WHERE user_name = ?;';
    console.log("LOGIN:");
    console.log(req.body);

    con.query(sql, [req.body.user_name], (error, results, fields) => {
        if(error) {
            console.log(error)
            return res.send({msg: "err", error: error})
        } else {
            var results_count = results.length;
            console.log(results_count);
            if (results_count === 0) {
                return res.send({msg: "user_not_exists"});
            }
            else if (results_count > 1) {
                return res.send({msg: "multiple_users_with_same_user_name"});
            }
            else {
                var user = results[0];
                //   var sol = results[0].sol;
                //   var hesloASol = req.body.heslo + sol;
                //   var hash = crypto.createHash('sha256').update(hesloASol).digest('base64');
                var hash = req.body.password;
                if (hash === user.password) {
                    // console.log(res);
                    let d = new Date(user.date_of_birth)
                    user.date_of_birth = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
                    return res.send({msg: "ok", user: user});
                }
                else {
                    return res.send({msg: "wrong_password"});
                }
            }
        }
    })
})

// PERSONS //

app.post('/get-persons', (req, res) => {
    var sql = 'SELECT * FROM persons;';
    con.query(sql, (error, results, fields) => {
        if(error) {
            return res.send(error);
        } else {
            return res.send(results);
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
                let d = new Date(person.date_of_birth)
                person.date_of_birth = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
                console.log(person);
                return res.send({msg: "ok", person: person});
            }
        }
    })
})

app.post('/add-person', (req, res) => {
    var sql = 'INSERT INTO persons (name, surname, date_of_birth, address, city, zip, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
    var person = req.body.person;
    console.log(person);
    con.query(sql, [person.name, person.surname, person.date_of_birth, person.address, person.city, person.zip, person.phone, person.email], (error, results, fields) => {
        if(error) {
            console.log(error);
            return res.send({ msg: "err", error: error });
        } else {
            return res.send({ msg: "person_added"});
        }
    })
})

app.post('/update-person', (req, res) => {
    // var sql = 'UPDATE persons SET name = ?, surname = ?, date_of_birth = ?, gender = ?, address=?, city=?, zip=?, phone = ?, email = ? WHERE id = ?;';
    var sql = 'UPDATE persons SET name = ?, surname = ?, date_of_birth = ?, address = ?, city = ?, zip = ?, phone = ?, email = ? WHERE id = ?;';
    var person = req.body.person;
    // console.log(person, person.name, person.surname, person.date_of_birth, person.address, person.city, person.zip, person.phone, person.email, person.id);
    // con.query(sql, [person.name, person.surname, person.date_of_birth, person.gender, person.address, person.city, person.zip, person.phone, person.email, person.id], (error, results, fields) => {
    con.query(sql, [person.name, person.surname, person.date_of_birth, person.address, person.city, person.zip, person.phone, person.email, person.id], (error, results, fields) => {
            if(error) {
            console.log(error);
            return res.send({ msg: "err", error: error });
        } else {
            console.log(results);
            return res.send({ msg: "Osoba upravena"});
        }
    })
})

app.post('/delete-person', (req, res) => {
    console.log(req.body);
    con.beginTransaction( (error, results) => {
        var sql1 = 'DELETE FROM membership WHERE person_id=?;';
        var sql2 = 'DELETE FROM persons WHERE id=?;';
        con.query(sql1, [req.body.id], (error, results, fields) => {
            if(error) {
                connection.rollback(() => {
                    return ({msg: 'err', error: error});
                });
            }
        })
        con.query(sql2, [req.body.id], (error, results, fields) => {
            if(error) {
                connection.rollback(() => {
                    return ({msg: 'err', error: error});
                });
            }
            con.commit( (error) => {
                if (error) { 
                  connection.rollback( () => {
                    return ({msg: 'err', error: error});
                  });
                }
                console.log('Transaction completed ');
                return ({msg: 'ok', results: results});
            });
            // console.log('qyery2: ', results);
        });
        console.log("transaction: ", results);
        if (error) {
            return ({msg: 'err', error: error});
        } else {
            return ({msg: 'ok', results: results});
        }
    })
})

// MEMBERSHIP //

app.post('/get-person-units', (req, res) => {
    var sql = 'SELECT u.id, u.name FROM membership AS m JOIN units AS u ON m.unit_id=u.id WHERE person_id = ?;';
    con.query(sql, [req.body.id], (error, results, fields) => {
        if(error) {
            return res.send(error)
        } else {
            console.log(results);
            return res.send(results);
        }
    })
})

app.post('/get-unit-persons', (req, res) => {
    var sql = 'SELECT p.id, p.name, p.surname FROM membership AS m JOIN persons AS p ON m.person_id=p.id WHERE unit_id = ?;'; // TODO overit
    con.query(sql, [req.body.id], (error, results, fields) => {
        if(error) {
            return res.send(error)
        } else {
            console.log(results);
            return res.send(results);
        }
    })
})

app.post('/add-membership', (req, res) => {
    var sql = 'INSERT INTO membership VALUES (?,?);';
    console.log("Adding membership",req.body);
    con.query(sql, [req.body.person_id, req.body.unit_id], (error, results, fields) => {
        if(error) {
            return res.send(error)
        } else {
            console.log(results);
            return res.send(results);
        }
    })
})

app.post('/delete-membership', (req, res) => {
    var sql = 'DELETE FROM membership WHERE person_id = ? AND unit_id = ?;';
    con.query(sql, [req.body.person_id, req.body.unit_id], (error, results, fields) => {
        if(error) {
            return res.send(error)
        } else {
            console.log(results);
            return res.send(results);
        }
    })
})

app.post('/delete-person-membership', (req, res) => {
    var sql = 'DELETE FROM membership WHERE person_id = ?;';
    con.query(sql, [req.body.id], (error, results, fields) => {
        if(error) {
            return res.send(error)
        } else {
            console.log(results);
            return res.send(results);
        }
    })
})

// UNITS //

app.post('/get-units', (req, res) => {
    var sql = 'SELECT * FROM units;';
    con.query(sql, (error, results, fields) => {
        if(error) {
            return res.send(error);
        } else {
            return res.send(results);
        }
    })
})

app.post('/get-unit', (req, res) => {
    var sql = 'SELECT * FROM units WHERE id = ?;';
    con.query(sql, [req.body.id], (error, results, fields) => {
        if(error) {
            return res.send({msg: "err", error: error})
        } else {
            var results_count = results.length;
            console.log(results_count);
            if (results_count === 0) {
                return res.send({msg: "unit_not_exists"});
            }
            else if (results_count > 1) {
                return res.send({msg: "multiple_units_with_same_id"});
            }
            else {
                var unit = results[0];
                return res.send({msg: "ok", unit: unit});
            }
        }
    })
})

app.post('/add-unit', (req, res) => {
    var sql = 'INSERT INTO units (name) VALUES (?);';
    var unit = req.body;
    console.log(unit);
    con.query(sql, [unit.name], (error, results, fields) => {
        if(error) {
            return res.send({ msg: "err", error: error });
        } else {
            return res.send({ msg: "Jednotka pridana"});
        }
    })
})

app.post('/update-unit', (req, res) => {
    var sql = 'UPDATE units SET name = ? WHERE id = ?;';
    var unit = req.body;
    console.log(unit);
    con.query(sql, [unit.name, unit.id], (error, results, fields) => {
        if(error) {
            return res.send({ msg: "err", error: error });
        } else {
            return res.send({ msg: "Jednotka upravena"});
        }
    })
})

app.post('/delete-unit', (req, res) => {
    console.log(req.body);
    con.beginTransaction( (error) => {
        var sql1 = 'DELETE FROM membership WHERE unit_id=?;';
        var sql2 = 'DELETE FROM units WHERE id=?;';
        con.query(sql1, [req.body.id], (error, results, fields) => {
            if(error) {
                connection.rollback(() => {
                    return ({msg: 'err', error: error});
                });
            }
        })
        return con.query(sql2, [req.body.id], (error, results, fields) => {
            if(error) {
                connection.rollback(() => {
                    return ({msg: 'err', error: error});
                });
            }
            return con.commit( (error) => {
                if (error) { 
                  connection.rollback( () => {
                    return ({msg: 'err', error: error});
                  });
                }
                console.log('Transaction completed');
                return ({msg: 'ok', results: results});
            });
        })
    })
})


// Start server
app.listen(port, () => {
    console.log('server listening on port: ${port}')
})