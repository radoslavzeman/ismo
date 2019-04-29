import React, { PureComponent } from 'react';
import {
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
} from 'react-md';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";



class Persons extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            slicedData: [],
            redirect: false,
        };

        this.routToPersonProfile.bind(this);


        fetch('http://localhost:4000/persons')
            .then(response => response.json())
            .then(response => this.setState({ persons: response, slicedData: response.slice(0, 10) }))
            .catch(err => console.log("Error while fetching persons: " + err))
    }

    // static propTypes = {
    //     mobile: PropTypes.bool.isRequired,
    // };

    handlePagination = (start, rowsPerPage) => {
        this.setState({ slicedData: this.state.persons.slice(start, start + rowsPerPage) });
    };

    routToPersonProfile = (id) => {
        let path = '/persons/' + id;
        this.props.history.push(path);
    }

    // redirectToAddPerson = () => {
    //     if (this.state.redirect) {
    //         this.setState({redirect: false})
    //         return (<Redirect to='/add-person' />)
    //     }
    // };

    render() {
        // const { slicedData } = this.state;

        const rowsPerPageLabel = this.props.mobile ? 'Rows' : 'Rows per page';


        return (
            <div>
            
            <DataTable baseId="simple-pagination">
                {/* <Card className="md-block-centered"> */}
                <TableHeader>
                    <TableRow selectable={false}>
                        <TableColumn key="name">Name</TableColumn>
                        <TableColumn key="surname">Surname</TableColumn>
                        <TableColumn key="id">Id</TableColumn>
                        {/* <TableColumn key="address">Address</TableColumn>
                        <TableColumn key="date_of_birth">Date of birth</TableColumn> */}
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
                                // flat
                                // primary
                                icon
                                menuItems={[
                                    {
                                    primaryText: <Link to={"/persons/"+id}>'Edit'</Link>,
                                    leftIcon: <FontIcon>edit</FontIcon>,
                                    // onClick: this.routToPersonProfile({id}),
                                },
                                // <Button flat onClick={this.routToPersonProfile({id})}>Hello, World!</Button>
                                ]}
                                >
                                more_vert
                                </MenuButton></TableColumn>
                            {/* <TableColumn>{address}, {zip} {city}</TableColumn>
                            <TableColumn>{date_of_birth}</TableColumn> */}
                        </TableRow>
                    ))}
                </TableBody>
                {/* </Card> */}
                <TablePagination rows={this.state.persons.length} rowsPerPageLabel={rowsPerPageLabel} onPagination={this.handlePagination} />
            </DataTable>
            <Link to="/add-person"><Button floating secondary svg onClick={this.setState({redirect: true})}><FontIcon>person_add</FontIcon></Button></Link>
            </div>
        );
    }

};

export default Persons