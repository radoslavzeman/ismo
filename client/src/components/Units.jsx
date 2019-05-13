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
    CardTitle,
    CardText,
    MenuButton,
    ListItem,
    DialogContainer,
} from 'react-md';
import { Link } from "react-router-dom";



class Units extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            units: [],
            slicedData: [],
            dialog_visible: "",
            dialog_text: "",
        };
    }

    componentDidMount() {
        this.getUnits();
    }

    handleRedirect = (path) => {
        this.props.history.push(path);
    }

    getUnits = () => {
        // console.log("getting all units");
        fetch('http://localhost:5000/get-units', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => {
            return response.json()
        }).then(response => {
            this.setState({ units: response, slicedData: response.slice(0, 10) });
        }).catch(err => console.log("Error while fetching units: " + err))
    }

    deleteUnit = (id) => {
        // console.log("deleting unit " + id);
        fetch('http://localhost:5000/delete-unit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id }),
        }).then(response => {
            return response.json();
        }).then(response => {
            if (response.msg === 'ok') {
                // console.log("unit " + id + " deleted");
                this.setState({ dialog_visible: true, dialog_text: "Unit succesfully deleted!" });
                this.getUnits();
            } else {
                this.setState({ dialog_visible: true, dialog_text: "Error while deleting unit" });
            }
        }).catch(err => console.log("Error while fetching unit: " + err))
    };

    handlePagination = (start, rowsPerPage) => {
        this.setState({ slicedData: this.state.units.slice(start, start + rowsPerPage) });
    };

    show = () => {
        this.setState({ dialog_visible: true });
    };

    hide = () => {
        this.setState({ dialog_visible: false });
    };

    render() {

        const rowsPerPageLabel = this.props.mobile ? 'Rows' : 'Rows per page';

        // DIALOG
        const { dialog_visible, dialog_text } = this.state;
        const actions = [];
        actions.push({ primary: true, children: 'OK', onClick: this.hide });
        // END DIALOG

        return (
            <div>

                <DialogContainer
                    id="add-person-dialog"
                    visible={dialog_visible}
                    onHide={this.hide}
                    actions={actions}
                    title={dialog_text}
                />

                <Card key="persons" className="md-cell md-cell--12">
                    <CardTitle title="Units" />
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
                                            <ListItem primaryText="Edit" key={"/units/" + id} onClick={() => this.handleRedirect("/units/" + id)} leftIcon={<FontIcon>edit</FontIcon>} />,
                                            <ListItem primaryText="Delete" secondary key={"delete" + id} onClick={() => this.deleteUnit(id)} leftIcon={<FontIcon>delete</FontIcon>} />,
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
                <Link to="/add-unit"><Button floating svg secondary className="md-cell--right md-cell--bottom"><FontIcon>group_add</FontIcon></Button></Link>
            </div>
        );
    }

};

export default Units