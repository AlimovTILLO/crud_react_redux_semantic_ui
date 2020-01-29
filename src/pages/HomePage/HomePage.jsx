import React from 'react'
import _ from 'lodash'
import { Container, Table, Header, Input, Select, Button, Dimmer, Loader, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { productActions } from '../../actions';
import { PaginationComponent } from '../../components/PaginationComponent'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'
import PropTypes from 'prop-types'

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

const options = [
    { key: 'name', text: 'Name', value: 'name' },
    { key: 'year', text: 'Year', value: 'year' },
]

class HomePage extends React.Component {

    state = {
        column: null,
        direction: null,
        isLoading: false,
        data: {},
        search: "",
        searchValue: "",
        selectValue: "name"
    }

    componentDidMount() {
        this.props.getProducts({ page: 1, per_page: 4 });
    }

    handleInputChange = (e, { value }) => {
        this.setState({ search: value })
    }

    handleSearchChange = () => {
        this.setState({ searchValue: this.state.search })
    }

    handleSelectChange = (e, { value }) => {
        this.setState({ selectValue: value });
    }

    handleSort = (clickedColumn) => () => {

        const source = this.props.products.pages.data
        const { column, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(source, [clickedColumn]),
                direction: 'ascending',
            })
            return
        }

        this.setState({
            data: source.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }


    handlePaginationChange = (e, { activePage }) => {
        this.setState({ searchValue: '' })
        this.props.getProducts({ page: activePage, per_page: 4 });
    }

    render() {

        const { column, direction, searchValue, selectValue } = this.state
        const { products, loading } = this.props;
        const { data: list = [] } = products.pages || {};
        const filteredList = list.length ? list.filter(obj => obj[selectValue].toString().toLowerCase().startsWith(searchValue.toLowerCase())) : []
        return (
            <ResponsiveContainer>
                <Container style={{ margin: '3em 0em 0em', padding: '3em 0em', minHeight: 'calc(100vh - 150px)' }}>

                    <Input type='text' placeholder='Search...' action onChange={this.handleInputChange}>
                        <input />
                        <Select compact options={options} value={selectValue} onChange={this.handleSelectChange} />
                        <Button type='submit' onClick={this.handleSearchChange}>Search</Button>
                    </Input>
                    <Header>Products:</Header>

                    <Table sortable celled fixed>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    sorted={column === 'name' ? direction : null}
                                    onClick={this.handleSort('name')} >
                                    Name </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'year' ? direction : null}
                                    onClick={this.handleSort('year')} >
                                    Year </Table.HeaderCell>
                                <Table.HeaderCell
                                    sorted={column === 'color' ? direction : null}
                                    onClick={this.handleSort('color')} >
                                    Color </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Pantone value </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {loading &&
                                <Dimmer active inverted>
                                    <Loader size='large'>Loading</Loader>
                                </Dimmer>
                            }
                            {
                                filteredList.map(({ id, name, year, color, pantone_value }) =>
                                    // _.map(data, ({ id, name, year, color, pantone_value }) =>
                                    <Table.Row key={id}>
                                        <Table.Cell>{name}</Table.Cell>
                                        <Table.Cell>{year}</Table.Cell>
                                        <Table.Cell>{color}  <div style={{ width: '20px', height: '20px', backgroundColor: color, display: 'inline-block' }}>&nbsp;</div></Table.Cell>
                                        <Table.Cell>{pantone_value}</Table.Cell>
                                    </Table.Row>
                                )}
                        </Table.Body>
                    </Table>
                    <Segment floated='right' style={{ padding: '8em 0em' }} vertical>
                        <PaginationComponent activePage={products.pages && products.pages.page} totalPages={products.pages && products.pages.total_pages} onPageChange={this.handlePaginationChange} />
                    </Segment>
                </Container>
            </ResponsiveContainer>
        );
    }
}

function mapState(state) {
    const { products, loading } = state;
    return { products, loading };
}

const actionCreators = {
    getProducts: productActions.getAll
}
const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
