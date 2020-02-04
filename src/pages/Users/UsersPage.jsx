import React from 'react'
import {
    Button,
    Modal,
    Message,
    Form,
    Container,
    Header,
    Grid,
    Card,
    Image,
    Icon,
    Segment,
    Loader,
    Dimmer,
    Label
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Formik } from "formik";
import * as Yup from "yup";


import './style.css'
import { PaginationComponent } from '../../components/PaginationComponent'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email недействителен")
        .required("Требуется электронная почта"),
    first_name: Yup.string()
        .min(2, "FirstName должен содержать не менее 2 символов")
        .required("Необходим FirstName"),
    last_name: Yup.string()
        .min(2, "LastName должен содержать не менее 2 символов")
        .required("Необходим LastName")
})


ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}


const profile = JSON.parse(localStorage.getItem('user'));



export class UsersPage extends React.Component {
    state = { deleteUserOpen: false, editUserOpen: false, createUserOpen: false, deletingUser: {}, editingUser: {}, activePage: 1 }
    close = () => this.setState({ deleteUserOpen: false, editUserOpen: false, createUserOpen: false, fileUrl: '', filedata: null })

    componentDidMount() {
        this.props.getUsers(1);
    }

    closeCreateConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, createUserOpen: true })
    }
    closeDeleteConfigShow = (closeOnEscape, closeOnDimmerClick, user) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, deleteUserOpen: true, deletingUser: user })
    }
    closeEditConfigShow = (closeOnEscape, closeOnDimmerClick, user) => () => {
        this.setState({
            closeOnEscape, closeOnDimmerClick, editUserOpen: true, editingUser: user, fileUrl: user.avatar,
        })
    }

    handlePaginationChange = (e, { activePage }) => {
        this.props.getUsers(activePage);
        this.setState({ activePage: activePage })
    }

    handleFileChange = (e) => {
        this.setState({ fileUrl: e.target.value, filedata: e.target.files[0] })
    }

    handleDeleteUser = () => {

        this.close()

        const { activePage, deletingUser } = this.state
        const { users } = this.props;

        if (users.pages.data.length === 1) {
            this.props.deleteUser({ id: deletingUser.id, page: activePage - 1 });
            this.setState({ activePage: activePage - 1 })
            if (activePage === 1) {
                this.props.deleteUser({ id: deletingUser.id, page: 1 });
                this.setState({ activePage: 1 })
            }
        } else {

            this.props.deleteUser({ id: deletingUser.id, page: activePage });
            this.setState({ activePage: activePage })
        }



    }

    render() {
        const { users } = this.props;
        const { deletingUser, editingUser, deleteUserOpen, editUserOpen, createUserOpen, closeOnEscape, closeOnDimmerClick, activePage, fileUrl, filedata } = this.state
        return (
            <ResponsiveContainer>
                <Container className="user-container">
                    <Button onClick={this.closeCreateConfigShow(true, false)} icon labelPosition='left' floated="right">
                        <Icon name='user plus' />Add user</Button>
                    <Header>Users:</Header>
                    {users.loading && <Dimmer active inverted> <Loader size='large'>Loading</Loader> </Dimmer>}
                    {users.error && <Message color='red'>{users.error}</Message>}
                    {users.pages &&
                        <Grid container columns={3} doubling stackable >
                            {users.pages.data.map((user, index) =>
                                <Grid.Column key={user.id} >
                                    <Card>
                                        <Image src={user.avatar} wrapped ui={false} />
                                        <Card.Content>
                                            <Card.Header>{user.first_name + ' ' + user.last_name}</Card.Header>
                                            <Card.Description>{user.email}</Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <div className='ui two buttons'>
                                                <Button onClick={this.closeEditConfigShow(true, false, user)} basic color='green'>Edit</Button>
                                                <Button disabled={user.id === profile.user.id} onClick={this.closeDeleteConfigShow(true, false, user)} basic color='red'>Delete</Button>
                                            </div>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            )}
                        </Grid>
                    }
                    <Segment floated='right' vertical>

                        <PaginationComponent activePage={activePage} totalPages={(users.pages && users.pages.total_pages) || ''} onPageChange={this.handlePaginationChange} />
                    </Segment>
                    <Modal
                        size='tiny'
                        open={createUserOpen}
                        closeOnEscape={closeOnEscape}
                        closeOnDimmerClick={closeOnDimmerClick}
                        onClose={this.close}
                    >
                        <Modal.Header>Add User</Modal.Header>
                        <Modal.Content>

                            <Modal.Description>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        first_name: "",
                                        last_name: "",
                                        email: ""
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={values => {
                                        this.close()
                                        this.props.createUser({ email: values.email, first_name: values.first_name, last_name: values.last_name, avatar: filedata }, activePage);
                                        this.setState({ activePage: activePage })
                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, errors }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Input label='Email *' placeholder='Email' name='email' value={values.email} onChange={handleChange} error={errors.email} />
                                            <Form.Input label='first_name *' placeholder='first_name' name='first_name' value={values.first_name} onChange={handleChange} error={errors.first_name} />
                                            <Form.Input label='last_name *' placeholder='last_name' name='last_name' value={values.last_name} onChange={handleChange} error={errors.last_name} />
                                            <Form.Input >
                                                <input type="text" placeholder="Select file" disabled value={fileUrl} />
                                                <input hidden id="file" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={this.handleFileChange} />
                                                <Label width="4" as="label" htmlFor="file" size="big"><Icon name="file" />Select</Label>
                                            </Form.Input>

                                            <Button
                                                disabled={(errors.email || !values.email) || (errors.first_name || !values.first_name) ? true : false}
                                                type="submit"
                                                onClick={handleSubmit}
                                                positive
                                                labelPosition='right'
                                                icon='checkmark'
                                                content='Submit'
                                            ></Button>
                                            <Button onClick={this.close} floated="right" negative>Cencel</Button>

                                        </Form>
                                    )}
                                </Formik>

                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                    <Modal
                        size='tiny'
                        open={editUserOpen}
                        closeOnEscape={closeOnEscape}
                        closeOnDimmerClick={closeOnDimmerClick}
                        onClose={this.close}
                    >
                        <Modal.Header>Edit user</Modal.Header>
                        <Modal.Content>

                            <Modal.Description>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={editingUser}
                                    validationSchema={validationSchema}
                                    onSubmit={values => {
                                        this.close()
                                        this.props.updateUser({ email: values.email, first_name: values.first_name, last_name: values.last_name, avatar: filedata, id: values.id });
                                        this.setState({ activePage: activePage })
                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, errors }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Input label='Email *' placeholder='Email' name='email' value={values.email} onChange={handleChange} error={errors.email} />
                                            <Form.Input label='FirstName *' placeholder='first_name' name='first_name' value={values.first_name} onChange={handleChange} error={errors.first_name} />
                                            <Form.Input label='LastName *' placeholder='last_name' name='last_name' value={values.last_name} onChange={handleChange} error={errors.last_name} />
                                            <Form.Input >
                                                <input type="text" placeholder="Select file" disabled value={fileUrl} />
                                                <input hidden id="file" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={this.handleFileChange} />
                                                <Label width="4" as="label" htmlFor="file" size="big"><Icon name="file" />Select</Label>
                                            </Form.Input>
                                            <Button
                                                disabled={(errors.email || !values.email) || (errors.first_name || !values.first_name)}
                                                type="button"
                                                onClick={handleSubmit}
                                                positive
                                                labelPosition='right'
                                                icon='checkmark'
                                                content='Submit'
                                            ></Button>
                                            <Button onClick={this.close} floated="right" negative>Cencel</Button>

                                        </Form>
                                    )}
                                </Formik>

                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                    <Modal
                        size='mini'
                        open={deleteUserOpen}
                        closeOnEscape={closeOnEscape}
                        closeOnDimmerClick={closeOnDimmerClick}
                        onClose={this.close}
                    >
                        <Modal.Header>Delete Your Account</Modal.Header>
                        <Modal.Content>
                            <p>Are you sure delete use <b>{deletingUser.first_name + ' ' + deletingUser.last_name}</b></p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.close} negative floated="right">Cencel</Button>
                            <Button
                                onClick={this.handleDeleteUser}
                                positive
                                labelPosition='right'
                                icon='checkmark'
                                content='Yes'
                            />
                        </Modal.Actions>
                    </Modal>
                </Container>
            </ResponsiveContainer>
        );
    }
}

