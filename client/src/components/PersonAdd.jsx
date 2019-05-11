// import React, { PureComponent } from 'react';
// import { Card, CardTitle, CardText, Button, CardActions, Slider, TextField, List, ListItem, Avatar, FontIcon , Autocomplete} from 'react-md';
// import Input from 'react-md-input'
// import _ from 'lodash'
// import { AuthConsumer } from './AuthContext';
// import Units from './Units'


// class PersonProfile extends PureComponent {

//   constructor(props) {
//     super(props);

//     this.state = {
//       person: {
//         name: "",
//         surname: "",
//         id: "",
//       },
//     };
//   }

//   componentDidMount() {
//     var id = null;
//     // console.log(this.props);
//     if (this.props.match.path === "/persons/:id") {
//       // console.log(this.props);
//       id = this.props.match.params.id;
//       this.getPerson(id);
//     } else if (this.props.match.path === "/profile") {
//       //   /// somehow get id from ctx.user.id
//       this.setState({ person: this.props.cookies.get('user') });
//       id = this.state.person.id;
//       // console.log("PERSON")
//       // console.log(this.props.cookies.get('user'));
//       // console.log(this.state);
//       // id = 1;
//     }
//       this.getPersonUnits(id);
//       // console.log("MOUNT")
//       // console.log(this.state);
//     // this.getAllUnits()
//   }

//   handleRedirect = (path) => {
//     this.props.history.push(path);
//   }

// //   getAllUnits = () => {
// //     console.log("getting all units");
// //     fetch('http://localhost:4000/get-units', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //     }).then(response => response.json()
// //     ).then(response => {
// //       // console.log("ALL UNITS");
// //       // console.log(response);
// //       this.setState({ all_units: response });
// //       console.log(this.state);
// //     }).catch(err => console.log("Error while fetching units: " + err))
// // }

//   getPerson = (id) => {
//     console.log("getting person " + id);
//     fetch('http://localhost:4000/get-person', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id: id })
//     }).then(response => {
//       return response.json()
//     }).then(data => {
//       // console.log(data.person)
//       this.setState({ person: data.person });
//       // console.log(this.state.person)
//     }).catch(err => console.log("Error while fetching persons: " + err))
//   }

//   addPerson = () => {
//     console.log("adding person");
//     fetch('http://localhost:4000/add-person', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: this.state.person.name, surname: this.state.person.surname })
//     }).then(response => {
//       // console.log(response)
//       return response.json()
//     }).then(data => {
//       // console.log(data.person)
//       this.setState({ person: data.person });
//     }).catch(err => console.log("Error while fetching persons: " + err))
//   }

// <Card className="md-block-centered">
//                 {/* <CardTitle title="Random User" subtitle="usrnm" /> */}
//                 <CardTitle title={person ? "Person" : "Add new person"} />
//                 <CardText>
//                   <form className="md-grid text-fields__application" onSubmit={person ? this.updatePerson.bind(this, params.id) : this.addPerson.bind(this)}>
//                     <TextField
//                       id="name"
//                       label="Name"
//                       className="md-cell md-cell--12"
//                       value={this.state.person.name}
//                       onChange={value => this.setState({ person: { name: value, surname: this.state.person.surname } })}
//                       controlled="true"
//                       // errorText="asdfasdf"
//                       required
//                     />
//                     <TextField
//                       id="surname"
//                       label="Surname"
//                       className="md-cell md-cell--12"
//                       value={this.state.person.surname}
//                       onChange={value => this.setState({ person: { name: this.state.person.name, surname: value } })}
//                       // errorText="asdfasdf"
//                       controlled="true"
//                       required
//                     />

//                     <CardActions className="md-cell md-cell--12">
//                       {person ? (
//                         <Button raised primary type="submit" className="md-cell--center"
//                         // disabled={!this.validateForm()}
//                         >Save</Button>
//                       ) : (
//                           <Button raised secondary type="submit" className="md-cell--center"
//                           // disabled={!this.validateForm()}
//                           >Add person</Button>
//                         )}

//                     </CardActions>
//                   </form>

//                 </CardText>
//               </Card>