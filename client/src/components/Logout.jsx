import React from 'react'
import { Button, Card, CardTitle, CardText } from 'react-md'

class Logout extends React.PureComponent {

  logout = () => {
    this.props.cookies.remove('user', { path: "/" });
    this.props.history.push("/");
  }

  render() {
    var user = this.props.cookies.get('user');
    return (
      <Card key="persons" className="md-cell md-cell--12">
        <CardTitle title={"Welcome " + user.name} />
        <CardText>
          <Button raised secondary onClick={() => this.logout()}>Logout</Button>
        </CardText>
      </Card>
    )
  }
};

export default Logout
