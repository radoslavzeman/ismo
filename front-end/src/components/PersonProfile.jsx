import React, { PureComponent } from 'react';
import { Card, CardTitle, CardText, Button, CardActions, Slider, TextField  } from 'react-md';


class PersonProfile extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      person: [],
    };
  }
  // componentDidMount() {
  //   console.log(this.props.match.id);
  //   this.getPerson(this.props.match.id);
  // }

  getPerson = (id) => {
    fetch('http://localhost:4000/get-person', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data.person)
            this.setState({person: data.person});
        }).catch(err => console.log("Error while fetching persons: " + err))
  }

  addPerson = () => {
    fetch('http://localhost:4000/add-person', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: "Paul", surname: "Young"})
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data.person)
            this.setState({person: data.person});
        }).catch(err => console.log("Error while fetching persons: " + err))
  }

  render() {
    // console.log(this.props)
    const { params } = this.props.match
    if ( Object.entries(params).length !== 0 || params.constructor !== Object ) {
      // console.log("PARAMS:");
      // console.log(params)
      this.getPerson(params.id)
      var person = this.state.person;
      return (
        <Card className="md-block-centered">
          {/* <CardTitle title="Random User" subtitle="usrnm" /> */}
          <CardTitle title={person.name + " " + person.surname} subtitle={person.user_name} />
                {/* <CardText>
                    <p><strong>Address: </strong>{person.address}, {person.zip} {person.city}</p>
                    <p><strong>Phone: </strong>{person.phone}</p>
                    <p><strong>Email: </strong>{person.email}</p>
                </CardText> */}
        </Card>
    );
    }
    else {
      return (
        <Card className="md-block-centered">
          {/* <CardTitle title="Random User" subtitle="usrnm" /> */}
          <CardTitle title="Add new person"/>
                <CardText>
                <form className="md-grid text-fields__application" onSubmit={this.addPerson.bind(this)}>
                    {/* <form className="md-grid text-fields__application" onSubmit={() => ctx.toggle_login()}> */}
                        <TextField
                            id="name"
                            label="Name"
                            className="md-cell md-cell--12"
                            value={this.state.name}
                            // defaultValue={this.state.user_name}
                            onChange={value => this.setState({ name: value })}
                            // errorText="asdfasdf"
                            required
                        />
                        <TextField
                            id="surname"
                            label="Surname"
                            className="md-cell md-cell--12"
                            value={this.state.surname}
                            // defaultValue={this.state.user_name}
                            onChange={value => this.setState({ surname: value })}
                            // errorText="asdfasdf"
                            required
                        />
                        {/* <TextField
                            id="date_of_birth"
                            label="Date of birth"
                            className="md-cell md-cell--12"
                            type="date"
                            // value={this.state.user_name}
                            // defaultValue={this.state.user_name}
                            // onChange={value => this.setState({ user_name: value })}
                            // errorText="asdfasdf"
                            required
                        /> */}
                        {/* <TextField
                            id="password"
                            label="Password"
                            type="password"
                            className="md-cell md-cell--12"
                            value={this.state.password}
                            // defaultValue={this.state.password}
                            // onChange={value => this.setState({ password: value })}
                            required
                        /> */}
                        <CardActions className="md-cell md-cell--12">
                            
                        </CardActions>
                    </form>
                    <Button
                                raised
                                secondary
                                type=""
                                onClick={this.addPerson()}
                                className="md-cell--center"
                                // disabled={!this.validateForm()}
                            >
                                Add Person
                            </Button> 
                </CardText>
        </Card>
      );
    }
  }
}

export default PersonProfile