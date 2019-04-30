import React, { PureComponent } from 'react';
import { Card, CardTitle, CardText, Button, CardActions, TextField } from 'react-md';
import _ from 'lodash'


class Unit extends PureComponent {

  constructor(props) {
    super(props);

    this.getUnit.bind(this);

    this.state = {
      unit: {
        id: "",
        name: "",
      },
    };
  }
  
  componentDidMount() {
    if (this.props.match.path === "/units/:id") {
        var id = this.props.match.params.id
        this.setState({unit: {id: id, name: ""}})
        this.getUnit(id);
    }
  }

  getUnit = (id) => {
    console.log("getting unit " + id);
    fetch('http://localhost:4000/get-unit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    }).then(response => {
      return response.json()
    }).then(data => {
      this.setState({ unit: data.unit });
    }).catch(err => console.log("Error while fetching persons: " + err))
  }

  addUnit = () => {
    console.log("adding unit");
    fetch('http://localhost:4000/add-unit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.state.unit.name })
    }).then(response => {
      console.log(response)
      return response.json()
    }).then(data => {
      console.log(data.unit)
      this.setState({ unit: data.unit });
    }).catch(err => console.log("Error while fetching unit: " + err))
  }

  updateUnit = (id) => {
    console.log("updating unit " + id);
    fetch('http://localhost:4000/update-unit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.state.unit.name, id: id })
    }).then(response => {
      console.log(response)
      return response.json()
    }).then(data => {
      console.log(data.unit)
    //   this.setState({ unit: data.unit });
    }).catch(err => console.log("Error while fetching unit: " + err))
  }

  render() {
    // console.log(this.props)
    const { params } = this.props.match
    if (!_.isEmpty(params)) {
      var unit = this.state.unit;

    }
    return (
      <Card className="md-block-centered">
        {/* <CardTitle title="Random User" subtitle="usrnm" /> */}
        <CardTitle title={unit ? "Unit" : "Add new unit"} />
        <CardText>
          <form className="md-grid text-fields__application" onSubmit={unit ? this.updateUnit.bind(this, params.id) : this.addUnit.bind(this)}>
            <TextField
              id="name"
              label="Name"
              className="md-cell md-cell--12"
              value={this.state.unit.name}
              onChange={value => this.setState({ unit: { name: value, id: this.state.unit.id } })}
              // errorText="asdfasdf"
              required
            />
            <TextField
              id="unit_id"
              label="Unit id"
              className="md-cell md-cell--12"
              value={this.state.unit.id}
              disabled={true}
              onChange={() => {}}
              // errorText="asdfasdf"
              required
            />

            <CardActions className="md-cell md-cell--12">
              {unit ? (
                <Button raised primary type="submit" className="md-cell--center"
                // disabled={!this.validateForm()}
                >Update unit</Button>
              ) : (
                  <Button raised secondary type="submit" className="md-cell--center"
                  // disabled={!this.validateForm()}
                  >Add unit</Button>
                )}

            </CardActions>
          </form>

        </CardText>
      </Card>
    );
  }
}

export default Unit