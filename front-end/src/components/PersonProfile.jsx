import React, { PureComponent } from 'react';
import { Card, CardTitle, CardText, Button, CardActions, Slider, TextField } from 'react-md';
import _ from 'lodash'


class PersonProfile extends PureComponent {

  constructor(props) {
    super(props);

    this.getPerson.bind(this);

    this.state = {
      person: {
        name: "",
        surname: "",
      },
    };
  }
  componentDidMount() {
    if (this.props.match.path === "/persons/:id") {
      this.getPerson(this.props.match.params.id);
    }
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
      console.log(response)
      return response.json()
    }).then(data => {
      console.log(data.person)
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
      console.log(response)
      return response.json()
    }).then(data => {
      console.log(data.person)
      this.setState({ person: data.person });
    }).catch(err => console.log("Error while fetching persons: " + err))
  }

  render() {
    // console.log(this.props)
    const { params } = this.props.match
    if (!_.isEmpty(params)) {
      var person = this.state.person;

    }
    return (
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
              required
            />

            <CardActions className="md-cell md-cell--12">
              {person ? (
                <Button raised primary type="submit" className="md-cell--center"
                // disabled={!this.validateForm()}
                >Update person</Button>
              ) : (
                  <Button raised secondary type="submit" className="md-cell--center"
                  // disabled={!this.validateForm()}
                  >Add person</Button>
                )}

            </CardActions>
          </form>

        </CardText>
      </Card>
    );
  }
}

export default PersonProfile