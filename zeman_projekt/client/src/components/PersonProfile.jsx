import React, { PureComponent } from 'react';
import { Card, CardTitle, CardText, Button, CardActions, DialogContainer, Slider, TextField, DatePicker, List, ListItem, Avatar, FontIcon, Autocomplete } from 'react-md';
import Input from 'react-md-input'
import _ from 'lodash'
import { AuthConsumer } from './AuthContext';
import Units from './Units'
import momemt from 'moment'
import DialogPerson from './DialogAddPerson'
import DialogAddPerson from './DialogAddPerson';

const h4style = { color: '#03a9f4', marginTop: '25px', marginBottom: '0px' };
const h4styleFirst = { color: '#03a9f4', marginBottom: '0px' };

class PersonProfile extends PureComponent {

  constructor(props) {
    super(props);

    this.getPerson.bind(this);
    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      adding_new_person: false,
      person: {
        // name: "",
        // surname: "",
        // id: "",
      },
      units: [],
      add_unit: "",
      // all_units: [{ id: 1, name: "Zebry" }, { id: 2, name: "Trpasilci" }],
    };
  }
  componentDidMount() {
    var id;
    var person;

    // person by id
    if (this.props.match.path === "/persons/:id") {
      id = this.props.match.params.id;
      this.getPerson(id);
      // this.setState(person);
      this.getPersonUnits(id);
      this.setState({ adding_new_person: false });
    }

    // logged user
    else if (this.props.match.path === "/profile") {
      person = this.props.cookies.get('user');
      console.log("# profile", person);
      this.setState({ person: person });
      id = person.id;
      this.getPersonUnits(id);
      this.setState({ adding_new_person: false });
    }

    // adding new person
    else {
      this.setState({ adding_new_person: true });
    }

    // console.log("DID MOUT", this.state);
  }

  handleRedirect = (path) => {
    this.props.history.push(path);
  }

  handleChange(v, event) {
    console.log("# handle change", v, event.target.id);
    let prevState = this.state.person;
    prevState[event.target.id] = v;
    this.setState(prevState);
  }

  handleDateChange(date) {
    let prevState = this.state.person;
    prevState['date_of_birth'] = date;
    this.setState(prevState);
  }

  show = () => {
    this.setState({ dialog_visible: true });
  };

  hide = () => {
    this.setState({ dialog_visible: false });
  };

  render() {
    console.log("RENDER", this.state, this.props);
    const { params, path } = this.props.match.params;
    // console.log(this.props);
    // console.log(params);
    var person = this.state.person;
    var units = this.state.units;
    // console.log(person);

    // DIALOG
    const { dialog_visible, dialog_text } = this.state;
    const actions = [];
    actions.push({ secondary: true, children: 'Cancel', onClick: this.hide });

    return (
      <div>
        <div>
          <DialogContainer
            id="add-person-dialog"
            visible={dialog_visible}
            onHide={this.hide}
            actions={actions}
            title={dialog_text}
          >
          </DialogContainer>
        </div>
        <div>

          {/***  PERSONS'S DATA  ***/}

          <Card className="md-block-centered">
            {/* <CardTitle title="Random User" subtitle="usrnm" /> */}
            <CardTitle title={!this.state.adding_new_person ? "Person" : "Add new person"} />
            <CardText>
              <form className="md-grid text-fields__application" onSubmit={!this.state.adding_new_person ? this.updatePerson.bind(this, person) : this.addPerson.bind(this, person)}>
                <h4 className="md-cell md-cell--12" style={h4styleFirst}>Required info</h4>
                <TextField required id="name" label="Name" className="md-cell md-cell--12"
                  value={this.state.person.name}
                  onChange={(v, e) => this.handleChange(v, e)}
                // errorText="asdfasdf"
                />
                <TextField required id="surname" label="Surname" className="md-cell md-cell--12"
                  value={this.state.person.surname}
                  onChange={(v, e) => this.handleChange(v, e)}
                // errorText="asdfasdf"
                />
                <TextField required id="date_of_birth" label="Date of birth" className="md-cell md-cell--12"
                  // type='date'
                  value={this.state.person.date_of_birth}
                  onChange={(v, e) => this.handleChange(v, e)}
                />

                <h4 className="md-cell md-cell--12" style={h4style}>Address</h4>
                <TextField id="address" label="Street" className="md-cell md-cell--12"
                  // type='date'
                  value={this.state.person.address}
                  onChange={(v, e) => this.handleChange(v, e)}
                />
                <TextField id="city" label="City" className="md-cell md-cell--6"
                  // type='date'
                  value={this.state.person.city}
                  onChange={(v, e) => this.handleChange(v, e)}
                />
                <TextField id="zip" label="ZIP" className="md-cell md-cell--6"
                  // type='date'
                  value={this.state.person.zip}
                  onChange={(v, e) => this.handleChange(v, e)}
                />
                <h4 className="md-cell md-cell--12" style={h4style}>Contact</h4>
                <TextField id="phone" label="Phone" className="md-cell md-cell--6" leftIcon={<FontIcon>phone</FontIcon>}
                  // type='date'
                  value={this.state.person.phone}
                  onChange={(v, e) => this.handleChange(v, e)}
                />
                <TextField id="email" label="Email" className="md-cell md-cell--6" leftIcon={<FontIcon>email</FontIcon>}
                  // type='date'
                  value={this.state.person.email}
                  onChange={(v, e) => this.handleChange(v, e)}
                />
                {/* <DatePicker
                  id="date_of_birth_picker"
                  label="Date of birth"
                  className="md-cell"
                  displayMode="portrait"
                  value={this.state.person.date_of_birth}
                  onChange={(dateString, dateObject, e) => this.handleDateChange(dateString)} // otherwise we should implement Intl.js
                /> */}

                <CardActions className="md-cell md-cell--12">
                  {!this.state.adding_new_person ? (
                    <Button raised primary type="button" className="md-cell--center"
                    // disabled={!this.validateForm()}
                    onClick={this.updatePerson.bind(this, person)}
                    >Save</Button>
                  ) : (
                      <Button raised secondary type="button" className="md-cell--center"
                      // disabled={!this.validateForm()}
                      onClick={this.addPerson.bind(this, person)}
                      >Add person</Button>
                    )}

                </CardActions>
              </form>

            </CardText>
          </Card>
        </div>


        {/***  UNITS  ***/}

        <div style={{marginTop: '20px'}}>
          {!this.state.adding_new_person ? (
            <Card>
              <CardTitle title={"Units"} />
              <CardText>
                <List className="md-cell md-cell-12">
                  {this.state.units.map(item =>
                    <ListItem
                      key={"/units/" + item.id}
                      // className="md-cell md-cell-12"
                      leftAvatar={<Avatar suffix="amber">{item.name.charAt(0)}</Avatar>}
                      primaryText={item.name}
                      onClick={() => this.handleRedirect("/units/" + item.id)}
                      renderChildrenOutside>
                      <Button icon secondary onClick={() => this.deletePersonMembership(this.state.person.id, item.id)}>delete</Button>
                    </ListItem>
                  )}
                </List>

                {/* Adding units */}
                <form
                  id="form-add-membership"
                  name="add-membership"
                  onSubmit={() => this.addPersonMembership(this.state.person.id, this.state.add_unit)}
                  className="md-grid"
                >

                  {/* <Autocomplete
                        id="units-autocomplete"
                        label="Add person to unit:"
                        placeholder="unit"
                        name="form_unit_name"
                        inline
                        // required
                        // value={this.state.form_unit_name}
                        data={this.state.all_units}
                        className="md-cell md-cell--6 md-cell--4-phone"
                        errorText="Specify the unit!"
                        // onBlur={this.handleBlur}
                        // onChange={this.handleChange}
                        filter={Autocomplete.caseInsensitiveFilter}
                        onAutocomplete={this.handleAutocomplete}
                      /> */}
                  <TextField
                    id="unit-id"
                    label="Write unit id"
                    className="md-cell md-cell--11 md-cell--3-phone"
                    name="form_unit_id"
                    value={this.state.add_unit}
                    onChange={(value) => this.setState({ add_unit: value })}
                  />
                  <Button
                    type="submit"
                    primary
                    icon
                    className="md-cell--left md-cell--middle"
                  // disabled={!pastry}
                  >
                    <FontIcon>add</FontIcon>
                  </Button>
                </form>
              </CardText>
            </Card>
          ) : (
              <div>
              </div>
            )}
        </div>
      </div>
    )
    //     }}
  }

  //   getAllUnits = () => {
  //     console.log("getting all units");
  //     fetch('http://localhost:4000/get-units', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //     }).then(response => response.json()
  //     ).then(response => {
  //       // console.log("ALL UNITS");
  //       // console.log(response);
  //       this.setState({ all_units: response });
  //       console.log(this.state);
  //     }).catch(err => console.log("Error while fetching units: " + err))
  // }

  getPerson = (id) => {
    console.log("# getting person " + id);
    fetch('http://localhost:4000/get-person', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log("# get person > setState person", data.person);
      // return ({person: data.person });

      let p = data.person;
      // let d = new Date(data.person.date_of_birth)
      // p.date_of_birth = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
      this.setState({ person: p });
      // console.log(this.state.person)
    }).catch(err => console.log("Error while fetching persons: " + err))
  }

  addPerson = (person) => {
    console.log("adding person", person);
    fetch('http://localhost:4000/add-person', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ person }),
    }).then(response => {
      console.log(response)
      // response.status)
      return response.json()
    }).then(data => {
      if (data.msg === "err") {
        if (data.error.code === 'ER_DUP_ENTRY') {
          console.log("DUPL.");
          this.setState({ dialog_visible: true, dialog_text: "Person already exists!" });
        }
      } else {
        this.setState({ dialog_visible: true, dialog_text: "Person succesfully added!" });
      }

      // else if
      // this.setState({ person: data.person });
    }).catch(err => console.log("Error while fetching persons: " + err))
  }

  updatePerson = (person) => {
    let id = person.id;
    console.log("updating person " + id);
    fetch('http://localhost:4000/update-person', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        person: {
          id: person.id,
          name: person.name,
          surname: person.surname,
          date_of_birth: person.date_of_birth,
          gender: person.gender,
          address: person.address,
          city: person.city,
          zip: person.zip,
          phone: person.phone,
          email: person.email,
        }
      }),
    }).then(response => {
      // console.log(response)
      return response.json()
    }).then(data => {
      // console.log(data.person)
      console.log("UPDATE PERSON", id)
      if (id === this.props.cookies.get('user').id) {
        this.props.cookies.set('user', person, { path: '/' });
      }
      // this.setState({ person: data.person });
    }).catch(err => console.log("Error while fetching persons: " + err))

  }

  getPersonUnits = (id) => {
    console.log("getting person units " + id);
    fetch('http://localhost:4000/get-person-units', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log("# person units:", data);
      // console.log(data)
      this.setState({ units: data });
      // console.log(this.state.person)
    }).catch(err => console.log("Error while fetching person's units: " + err))
  }

  deletePersonMembership = (person_id, unit_id) => {
    console.log("deleting person membership in unit " + unit_id);
    fetch('http://localhost:4000/delete-membership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ person_id: person_id, unit_id: unit_id })
    }).then(response => response.json()
    ).then(data => {
      // console.log("DELETE DATA:")
      // console.log(data)
      if (data.affectedRows > 0) {
        this.getPersonUnits(person_id);
      }
      // console.log(this.state.person)
    }).catch(err => console.log("Error while fetching person's units: " + err))
  }

  addPersonMembership = (person_id, unit_id) => {
    console.log("adding person membership in unit " + unit_id);
    fetch('http://localhost:4000/add-membership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ person_id: person_id, unit_id: unit_id })
    }).then(response => response.json()
    ).then(data => {
      // console.log("DELETE DATA:")
      // console.log(data)
      if (data.affectedRows > 0) {
        this.getPersonUnits(person_id);
      }
      // console.log(this.state.person)
    }).catch(err => console.log("Error while fetching person's units: " + err))
  };

}

export default PersonProfile;