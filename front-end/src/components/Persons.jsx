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
} from 'react-md';



class Persons extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            slicedData: []
        };

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

    addPerson = () => {
        fetch('http://localhost:4000/add-person', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 1 })
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data.msg)
        }).catch(err => console.log("Error while fetching persons: " + err))
    }

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
                        <TableColumn key="address">Address</TableColumn>
                        <TableColumn key="date_of_birth">Date of birth</TableColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.state.slicedData.map(({ id, name, surname, address, zip, city, date_of_birth }) => (
                        <TableRow key={id} selectable={false}>
                            <TableColumn>{name}</TableColumn>
                            <TableColumn>{surname}</TableColumn>
                            <TableColumn>{address}, {zip} {city}</TableColumn>
                            <TableColumn>{date_of_birth}</TableColumn>
                        </TableRow>
                    ))}
                </TableBody>
                {/* </Card> */}
                <TablePagination rows={this.state.persons.length} rowsPerPageLabel={rowsPerPageLabel} onPagination={this.handlePagination} />
            </DataTable>
            <Button floating secondary svg onClick={this.addPerson}><FontIcon>plus_one</FontIcon></Button>
            </div>
        );
    }

};

export default Persons