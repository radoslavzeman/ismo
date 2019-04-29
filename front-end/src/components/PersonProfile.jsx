import React, { PureComponent } from 'react';
import { Card, CardTitle, CardText, Button, CardActions, Slider, TextField, List, ListItem, Avatar, FontIcon } from 'react-md';
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { AuthConsumer } from './AuthContext';


class PersonProfile extends PureComponent {

  constructor(props) {
    super(props);

    this.getPerson.bind(this);

    this.state = {
      person: {
        name: "",
        surname: "",
      },
      units: [],
    };
  }
  componentDidMount() {
    var id = null;
    console.log(this.props);
    if (this.props.match.path === "/persons/:id") {
      id = this.props.match.params.id;

      // lse if (this.props.match.path === "/profile") {
      //   var ctx = useContext(AuthConsumer);
      //   id = this.state.
      // }
      this.getPerson(id);
      this.getPersonUnits(id);
      console.log("MOUNT")
      console.log(this.state);
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

  getPersonUnits = (id) => {
    console.log("getting person units " + id);
    fetch('http://localhost:4000/get-person-units', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log("DATA:")
      console.log(data)
      this.setState({ units: data });
      // console.log(this.state.person)
    }).catch(err => console.log("Error while fetching person's units: " + err))
  }

  handleUnitClick = (id) => {
    this.props.history.push("/units/" + id);
  };


  render() {
    // console.log(this.props)
    const { params } = this.props.match
    if (!_.isEmpty(params)) {
      var person = this.state.person;
      var units = this.state.units;
    }
    console.log("RENDER");
    console.log(this.state.units);
    this.state.units.map((item) => console.log(item))
    return (
      <AuthConsumer>
        {(ctx) => {
          this.setState({context: ctx});
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
                          key={TextMetrics.id}
                          leftAvatar={<Avatar suffix="amber">{item.name.charAt(0)}</Avatar>}
                          primaryText={item.name}
                          onClick={() => this.handleUnitClick(item.id)}
                          renderChildrenOutside>
                          <Button icon secondary>delete</Button>
                        </ListItem>
                      )}
                    </List>
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

export default withRouter(PersonProfile);