import React, { PureComponent } from 'react';
import { Card, CardTitle, CardText, Slider } from 'react-md';
import { AuthProvider, AuthConsumer } from './AuthContext'

import Login from "./Login";


const style = { maxWidth: 600 };

// const user = {
//     id: 0,
//     name: "R",
//     surname: "Z",
//     date_of_birth: "1100-01-01",
//     gender: 'M',
//     address: 'MojaUlica 1',
//     city: 'Bratislava',
//     zip: '83107',
//     phone: '+421901123456',
//     email: 'mail@mail.com',
//     unit: null,
//     user_name: "radoze",
//     password: null,
//     user_state: 0,
//     user_created: null
// }


class Profile extends PureComponent {

    render() {
        return (
            <AuthConsumer>
            { (ctx) => {
                var user = ctx.user;
                console.log(ctx);
                return (
                    ctx.is_user ? (
                        
                        // <div>
                        //     User logged in.
                        // </div>
                        <Card style={style} className="md-block-centered">
                            {/* <CardTitle title="Random User" subtitle="usrnm" /> */}
                            <CardTitle title={user.name + " " + user.surname} subtitle={user.user_name} />
                            <CardText>
                                <p><strong>Address: </strong>{user.address}, {user.zip} {user.city}</p>
                                <p><strong>Phone: </strong>{user.phone}</p>
                                <p><strong>Email: </strong>{user.email}</p>
                            </CardText>
                        </Card>
                    ) : (
                        <Login />
                    )
                )
            }}
            
            </AuthConsumer>
        );
    }
};

export default Profile;
