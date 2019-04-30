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
} from 'react-md';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";



class Units extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            units: [],
            slicedData: [],
        };        
    }

    componentDidMount() {
        this.getUnits();
    }

    handleRedirect = (path) => {
        this.props.history.push(path);
    }

    getUnits = () => {
        console.log("getting all units");
        fetch('http://localhost:4000/get-units', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            return response.json()
        }).then(response => {
            this.setState({ units: response, slicedData: response.slice(0, 10) });
        }).catch(err => console.log("Error while fetching units: " + err))
    }

    handlePagination = (start, rowsPerPage) => {
        this.setState({ slicedData: this.state.units.slice(start, start + rowsPerPage) });
    };

    render() {

        const rowsPerPageLabel = this.props.mobile ? 'Rows' : 'Rows per page';


        return (
            <div>
            <Card key="persons" className="md-cell md-cell--12">
            <DataTable baseId="simple-pagination">
                <TableHeader>
                    <TableRow selectable={false}>
                        <TableColumn key="name">Name</TableColumn>
                        <TableColumn key="id">Id</TableColumn>
                        <TableColumn key="menu"></TableColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.state.slicedData.map(({ id, name }) => (
                        <TableRow key={id} selectable={false}>
                            <TableColumn>{name}</TableColumn>
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
                                    <ListItem primaryText="Edit" key={"/units/"+id} onClick={() => this.handleRedirect("/units/"+id)} leftIcon={<FontIcon>edit</FontIcon>}/>,
                                ]}
                                >
                                more_vert
                                </MenuButton>
                            </TableColumn>
                        </TableRow>
                    ))}
                </TableBody>
                
                <TablePagination rows={this.state.units.length} rowsPerPageLabel={rowsPerPageLabel} onPagination={this.handlePagination} />
            </DataTable>
            </Card>
            <Link to="/add-unit"><Button floating svg secondary  className="md-cell--right md-cell--bottom"><FontIcon>group_add</FontIcon></Button></Link>
            </div>
        );
    }

};

export default Units