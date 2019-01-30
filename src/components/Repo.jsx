import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import {
    FilteringState,
    IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {Grid, Table, TableHeaderRow, TableFilterRow} from '@devexpress/dx-react-grid-material-ui';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    tableStriped: {
        '& tbody tr:nth-of-type(odd)': {
            backgroundColor: fade(theme.palette.primary.main, 0.15),
        },
    },
});

const TableComponentBase = ({classes, ...restProps}) => (
    <Table.Table
        {...restProps}
        className={classes.tableStriped}
    />
);

export const TableComponent = withStyles(styles, {name: 'TableComponent'})(TableComponentBase);

const TableRow = ({row, ...restProps}) => (

    // console.log("row", row)

    <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert


        onClick={() =>

            alert(JSON.stringify(row))}

        style={{
            cursor: 'pointer',
            //   ...styles[row.sector.toLowerCase()],
        }}
    />
);

class Repo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'name', title: 'name'},
                { name: 'address', title: 'address'},
                { name: 'phone_number', title: 'phone_number'},
            ],
            rows: []
        };
    }


    componentDidMount() {
        axios.get('http://www.mocky.io/v2/581335f71000004204abaf83')
            .then(res => {
                const rows = res.data.contacts;
                this.setState({rows});
                console.log("database is: ", this.state.rows);
                console.log("name is: ", this.state.rows[0]['name']);
                console.log("address is: ", this.state.rows[0]['address']);
                console.log("phone_number is: ", this.state.rows[0]['phone_number']);


                // console.log("one is type: ", typeof(this.state.rows[0]['Author']));
                // console.log("author is: ", this.state.rows[0]['Author']);
                // console.log("version is: ", this.state.rows[0]['Version']);
                // console.log("description is: ", this.state.rows[0]['Description']);
            })
            .catch(err => {
                console.error(err)
            })

    }

    render() {

        const {rows, columns} = this.state;
        return (

            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <FilteringState defaultFilters={[]}/>
                    <IntegratedFiltering/>
                    <Table
                        tableComponent={TableComponent} rowComponent={TableRow}
                    />
                    <TableHeaderRow/>
                    <TableFilterRow/>
                </Grid>
            </Paper>
        )
    }
}

export default Repo