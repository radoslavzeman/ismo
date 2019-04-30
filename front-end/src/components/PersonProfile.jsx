import React, { PureComponent } from 'react';
import { Card, CardTitle, CardText, Button, CardActions, Slider, TextField, List, ListItem, Avatar, FontIcon , Autocomplete} from 'react-md';
import Input from 'react-md-input'
import _ from 'lodash'
import { AuthConsumer } from './AuthContext';
import Units from './Units'


class PersonProfile extends PureComponent {

  constructor(props) {
    super(props);

    this.getPerson.bind(this);
    // this.handleChange = this.handleChange.bind(this);

    this.state = {
      person: {
        name: "",
        surname: "",
        id: "",
      },
      units: [],
      add_unit: "",
      all_units: [{id: 1, name: "Zebry"}, {id: 2, name: "Trpasilci"}],
    };
  }
  componentDidMount() {
    var id = null;
    // console.log(this.props);
    if (this.props.match.path === "/persons/:id") {
      id = this.props.match.params.id;
      // else if (this.props.match.path === "/profile") {
      //   /// somehow get id from ctx.user.id
      // }
      this.getPerson(id);
      this.getPersonUnits(id);
      // console.log("MOUNT")
      // console.log(this.state);
    }
    // this.getAllUnits()
  }

  handleRedirect = (path) => {
    this.props.history.push(path);
  }

  getAllUnits = () => {
    console.log("getting all units");
    fetch('http://localhost:4000/get-units', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json()
    ).then(response => {
      // console.log("ALL UNITS");
      // console.log(response);
      this.setState({ all_units: response });
      console.log(this.state);
    }).catch(err => console.log("Error while fetching units: " + err))
}

  getPerson = (id) => {
    console.log("getting person " + id);
    fetch('http://localhost:4000/get-person', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    }).then(response => {
      return response.json()
    }).then(data => {
      // console.log(data.person)
      this.setState({ person: data.person });
      // console.log(this.state.person)
    }).catch(err => console.log("Error while fetching persons: " + err))
  }

  addPerson = () => {
    console.log("adding person");
    fetch('http://localhost:4000/add-person', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.state.person.name, surname: this.state.person.surname })
    }).then(response => {
      // console.log(response)
      return response.json()
    }).then(data => {
      // console.log(data.person)
      this.setState({ person: data.person });
    }).catch(err => console.log("Error while fetching persons: " + err))
  }

  updatePerson = (id) => {
    console.log("updating person " + id);
    fetch('http://localhost:4000/update-person', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.state.person.name, surname: this.state.person.surname, id: id })
    }).then(response => {
      // console.log(response)
      return response.json()
    }).then(data => {
      // console.log(data.person)
      this.setState({ person: data.person });
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
      // console.log("DATA:")
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
  }

  

  // handleChange(event) {
  //   const target = event.target;
  //   console.log("event")
  //   console.log(event)
  //   // const value = target.value;
  //   // const name = target.name;

  //   // this.setState({
  //   //   [name]: value
  //   // });
  // }


  render() {
    // console.log(this.props)
    const { params } = this.props.match
    if (!_.isEmpty(params)) {
      var person = this.state.person;
      var units = this.state.units;
    }
    // console.log("RENDER");
    // console.log(this.state.user);
    // this.state.units.map((item) => console.log(item))
    return (
      <AuthConsumer>
        {(ctx) => {
          this.setState({ context: ctx });
          return (
            <div>
              <Card className="md-block-centered">
                {/* <CardTitle title="Random User" subtitle="usrnm" /> */}
                <CardTitle title={person ? "Person" : "Add new person"} />
                <CardText>
                  <form className="md-grid text-fields__application" onSubmit={person ? this.updatePerson.bind(this, params.id) : this.addPerson.bind(this)}>
                    <TextField
                      id="name"
                      label="Name"
                      className="md-cell md-cell--12"
                      value={this.state.person.name}
                      onChange={value => this.setState({ person: { name: value, surname: this.state.person.surname } })}
                      controlled="true"
                      // errorText="asdfasdf"
                      required
                    />
                    <TextField
                      id="surname"
                      label="Surname"
                      className="md-cell md-cell--12"
                      value={this.state.person.surname}
                      onChange={value => this.setState({ person: { name: this.state.person.name, surname: value } })}
                      // errorText="asdfasdf"
                      controlled="true"
                      required
                    />

                    <CardActions className="md-cell md-cell--12">
                      {person ? (
                        <Button raised primary type="submit" className="md-cell--center"
                        // disabled={!this.validateForm()}
                        >Update personal data</Button>
                      ) : (
                          <Button raised secondary type="submit" className="md-cell--center"
                          // disabled={!this.validateForm()}
                          >Add person</Button>
                        )}

                    </CardActions>
                  </form>

                </CardText>
              </Card>

              {person ? (
                <Card>
                  <CardTitle title={"Units"} />
                  <CardText>
                    <List className="md-cell md-cell-12">
                      {this.state.units.map(item =>
                        <ListItem
                          key={"/units/"+item.id}
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
                      onSubmit={() => this.addPersonMembership(this.state.person.id, this.state.form_unit_id)}
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
                        className="md-cell md-cell--6 md-cell--4-phone"
                        name="form_unit_id"
                        value={this.state.form_unit_id}
                        onChange={(value) => this.setState({form_unit_id: value})}
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
          )
        }}
      </AuthConsumer>
    );
  }
}

export default PersonProfile;