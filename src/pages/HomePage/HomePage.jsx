import React from 'react'
import _ from 'lodash'
import { Container, Pagination, Table, Header } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { productActions } from '../../actions';
import { ResponsiveContainer } from '../../components/ResponsiveContainer'
import PropTypes from 'prop-types'



ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

class HomePage extends React.Component {

    state = {
        column: null,
        direction: null,
    }


    componentDidMount() {
        this.props.getProducts({ page: 1, per_page: 4 });
    }

    handleSort = (clickedColumn) => () => {
        const data = this.props.products.pages.data
        const { column, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }


    handlePaginationChange = (e, { activePage }) => {
        this.props.getProducts({ page: activePage, per_page: 4 });
    }

    render() {
        const { column, direction } = this.state
        const { products } = this.props;
        return (
            <ResponsiveContainer>
                <Container style={{ margin: '3em 0em 0em', padding: '3em 0em', minHeight: 'calc(100vh - 150px)' }}>

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
                                <Table.HeaderCell
                                    sorted={column === 'pantone_value' ? direction : null}
                                    onClick={this.handleSort('pantone_value')} >
                                    Pantone value </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {products.pages && products.pages.data.map((user, index) =>
                                <Table.Row key={user.id}>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>{user.year}</Table.Cell>
                                    <Table.Cell>{user.color}</Table.Cell>
                                    <Table.Cell>{user.pantone_value}</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
                                    <Pagination floated='right'
                                        activePage={products.pages && products.pages.page}
                                        boundaryRange={1}
                                        onPageChange={this.handlePaginationChange}
                                        size='mini'
                                        siblingRange={1}
                                        totalPages={products.pages && products.pages.total_pages}
                                        ellipsisItem={false ? undefined : null}
                                        firstItem={true ? undefined : null}
                                        lastItem={true ? undefined : null}
                                        prevItem={true ? undefined : null}
                                        nextItem={true ? undefined : null}
                                    />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>







                </Container>
            </ResponsiveContainer>
        );
    }
}

function mapState(state) {
    const { products } = state;
    return { products };
}

const actionCreators = {
    getProducts: productActions.getAll
}
const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
