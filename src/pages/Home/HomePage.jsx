import React from 'react'
import _ from 'lodash'
import {
    Container,
    Table,
    Header,
    Input,
    Select,
    Button,
    Dimmer,
    Loader,
    Segment
} from 'semantic-ui-react'
import { object, bool, func } from 'prop-types'

import './style.css'
import { PaginationComponent } from '../../components/PaginationComponent'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const options = [
    { key: 'name', text: 'Name', value: 'name' },
    { key: 'year', text: 'Year', value: 'year' },
]

export class HomePage extends React.Component {
    static propTypes = {
        products: object,
        loading: bool,
        source: object,
        getProducts: func,
    }

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
        this.props.getProducts({ page: 1 });
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
        }

        this.setState({
            data: source.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ searchValue: '' })
        this.props.getProducts({ page: activePage });
    }

    render() {
        const { column, direction, searchValue, selectValue } = this.state
        const { products, loading } = this.props;
        const { data: list = [] } = products.pages || {};
        const filteredList = list.length ? list.filter(obj => obj[selectValue].toString().toLowerCase().startsWith(searchValue.toLowerCase())) : []
        return (
            <ResponsiveContainer>
                <Container className="product-container">

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
                                    <Table.Row key={id}>
                                        <Table.Cell>{name}</Table.Cell>
                                        <Table.Cell>{year}</Table.Cell>
                                        <Table.Cell>{color}
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: color,
                                                display: 'inline-block'
                                            }}>&nbsp;</div></Table.Cell>
                                        <Table.Cell>{pantone_value}</Table.Cell>
                                    </Table.Row>
                                )}
                        </Table.Body>
                    </Table>
                    <Segment floated='right' vertical>
                        <PaginationComponent
                            activePage={(products.pages && products.pages.page) || 1}
                            totalPages={(products.pages && products.pages.total_pages) || 1}
                            onPageChange={this.handlePaginationChange} />
                    </Segment>
                </Container>
            </ResponsiveContainer>
        );
    }
}