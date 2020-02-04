import { Pagination } from 'semantic-ui-react'
import React from 'react'
import PropTypes from 'prop-types'

export class PaginationComponent extends React.Component {
    static propTypes = {
        activePage: PropTypes.number,
        totalPages: PropTypes.number,
        onPageChange: PropTypes.func,
    }


    render() {
        const { activePage, totalPages, onPageChange } = this.props;
        return (<Pagination
            activePage={activePage}
            boundaryRange={1}
            onPageChange={onPageChange}
            size='mini'
            siblingRange={1}
            totalPages={totalPages}
            ellipsisItem={false ? undefined : null}
            firstItem={true ? undefined : null}
            lastItem={true ? undefined : null}
            prevItem={true ? undefined : null}
            nextItem={true ? undefined : null}
        />
        );
    }
}