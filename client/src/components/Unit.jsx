import React, { PureComponent } from 'react';
import { Card, CardTitle, CardText, Button, CardActions, TextField, DialogContainer } from 'react-md';
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
      dialog_visible: false,
      dialog_text: "",
    };
  }

  componentDidMount() {
    if (this.props.match.path === "/units/:id") {
      var id = this.props.match.params.id
      this.setState({ unit: { id: id, name: "" } })
      this.getUnit(id);
    } else {
      this.setState({ unit: {} })
    }
  }

  getUnit = (id) => {
    console.log("getting unit " + id);
    fetch('http://localhost:5000/get-unit', {
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
    // console.log("adding unit");
    fetch('http://localhost:5000/add-unit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.state.unit.name })
    }).then(response => {
      return response.json()
    }).then(data => {
      this.setState({ dialog_visible: true, dialog_text: "Unit succesfully added!" });
      this.componentDidMount();
    }).catch(err => console.log("Error while fetching unit: " + err))
  }

  updateUnit = (id) => {
    // console.log("updating unit " + id);
    fetch('http://localhost:5000/update-unit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.state.unit.name, id: id })
    }).then(response => {
      return response.json()
    }).then(data => {
      this.setState({ dialog_visible: true, dialog_text: "Unit succesfully updated!" });
    }).catch(err => console.log("Error while fetching unit: " + err))
  }

  handleChange(v, event) {
    // console.log("# handle change", v, event.target.id);
    let prevState = this.state.unit;
    prevState[event.target.id] = v;
    this.setState(prevState);
  }

  show = () => {
    this.setState({ dialog_visible: true });
  };

  hide = () => {
    this.setState({ dialog_visible: false });
  };


  render() {
    // DIALOG
    const { dialog_visible, dialog_text } = this.state;
    const actions = [];
    actions.push({ secondary: true, children: 'Cancel', onClick: this.hide });
    // END DIALOG

    const { params } = this.props.match
    if (!_.isEmpty(params)) {
      var unit = this.state.unit;

    }

    return (
      <Card className="md-block-centered">
        <DialogContainer
          id="add-person-dialog"
          visible={dialog_visible}
          onHide={this.hide}
          actions={actions}
          title={dialog_text}
        />
        <CardTitle title={unit ? "Unit" : "Add new unit"} />
        <CardText>
          <form className="md-grid text-fields__application">
            <TextField
              id="name"
              label="Name"
              className="md-cell md-cell--12"
              value={this.state.unit.name || undefined}
              onChange={(v, e) => this.handleChange(v, e)}
              required
            />
            <TextField
              id="unit_id"
              label="Unit id"
              className="md-cell md-cell--12"
              value={this.state.unit.id || undefined}
              disabled={true}
              onChange={() => { }}
              required
            />

            <CardActions className="md-cell md-cell--12">
              {unit ? (
                <Button raised primary type="button" className="md-cell--center"
                  onClick={this.updateUnit.bind(this, params.id)}
                >Update unit</Button>
              ) : (
                  <Button raised secondary type="button" className="md-cell--center"
                    onClick={this.addUnit.bind(this)}
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