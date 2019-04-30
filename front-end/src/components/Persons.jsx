import React, { PureComponent } from 'react';
import {
    Avatar,
    DataTable,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn,
    TablePagination,
    FontIcon,
    Button,
    Card,
    MenuButton,
    ListItem,
    Paper,
} from 'react-md';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";



class Persons extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            slicedData: [],
        };
    }

    componentDidMount() {
        this.getPersons();
    };

    getPersons = () => {
        console.log("getting all persons");
        fetch('http://localhost:4000/get-persons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            return response.json()
        }).then(response => {
            this.setState({ persons: response, slicedData: response.slice(0, 10) });
        }).catch(err => console.log("Error while fetching persons: " + err))
    };

    handlePagination = (start, rowsPerPage) => {
        this.setState({ slicedData: this.state.persons.slice(start, start + rowsPerPage) });
    };

    handleRedirect = (path) => {
        this.props.history.push(path);
    }

    render() {
        const rowsPerPageLabel = this.props.mobile ? 'Rows' : 'Rows per page';


        return (
            <div>
            <Card key="persons" className="md-cell md-cell--12">
            <DataTable baseId="simple-pagination" >
                {/* <Card className="md-cell md-cell--12"> */}
                <TableHeader>
                    <TableRow selectable={false}>
                        <TableColumn key="name">Name</TableColumn>
                        <TableColumn key="surname">Surname</TableColumn>
                        <TableColumn key="id">Id</TableColumn>
                        <TableColumn key="menu"></TableColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.state.slicedData.map(({ id, name, surname }) => (
                        <TableRow key={id} selectable={false}>
                            <TableColumn>{name}</TableColumn>
                            <TableColumn>{surname}</TableColumn>
                            <TableColumn>{id}</TableColumn>
                            <TableColumn><MenuButton
                                id="menu-button-2"
                                anchor={{
                                    x: MenuButton.HorizontalAnchors.INNER_LEFT,
                                    y: MenuButton.VerticalAnchors.TOP,
                                }}
                                position={MenuButton.Positions.TOP_RIGHT}
                                icon
                                menuItems={[
                                <Link to={"/persons/"+id}><ListItem primaryText="Edit" key={"edit"+id} onClick={() => this.handleRedirect('/persons/' + id)} leftIcon={<FontIcon>edit</FontIcon>}/></Link>,
                                ]}
                                >
                                more_vert
                                </MenuButton></TableColumn>
                        </TableRow>
                    ))}
                </TableBody>
                {/* </Card> */}
                {/* </Paper> */}
                <TablePagination rows={this.state.persons.length} rowsPerPageLabel={rowsPerPageLabel} onPagination={this.handlePagination} />

            </DataTable>
            </Card>

            <Link to="/add-person"><Button floating secondary svg><FontIcon>person_add</FontIcon></Button></Link>
            </div>
        );
    }

};

export default Persons