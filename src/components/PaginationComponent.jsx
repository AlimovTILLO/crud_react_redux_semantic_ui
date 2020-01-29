import { Pagination } from 'semantic-ui-react'
import React from 'react'

export class PaginationComponent extends React.Component {

    render() {
        const { activePage, totalPages , onPageChange} = this.props;
        return (<Pagination floated='right'
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