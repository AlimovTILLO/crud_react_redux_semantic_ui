import {
    Container,
    Header,
    Grid,
    Segment,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import React from 'react'

export class Footer extends React.Component {

    render() {
        return (<Segment inverted  style={{ margin: '5em 0em 0em', padding: '3em 0em'}} vertical>
        <Container>
            <Grid divided inverted stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Header inverted as='h4' textAlign='center'>
                            <Header.Content><Link to="#" >About Us</Link></Header.Content>
                        </Header>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </Container>
    </Segment>
        );
    }
}