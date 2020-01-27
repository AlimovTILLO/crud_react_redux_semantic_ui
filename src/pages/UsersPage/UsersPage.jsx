import React from 'react'
import {
    Button,
    Modal,
    Pagination,
    Message,
    Form,
    Container,
    Header,
    Grid,
    Card,
    Image,
    Icon
} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Formik } from "formik";
import * as Yup from "yup";
import { userActions } from '../../actions';
import PropTypes from 'prop-types'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email недействителен")
        .required("Требуется электронная почта"),
    first_name: Yup.string()
        .min(2, "first_name должен содержать не менее 2 символов")
        .required("Необходим first_name"),
    last_name: Yup.string()
        .min(2, "last_name должен содержать не менее 2 символов")
        .required("Необходим last_name")
})


ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}


class UsersPage extends React.Component {


    state = { deleteUserOpen: false, editUserOpen: false, createUserOpen: false, deletingUser: {}, editingUser: {}, }

    close = () => this.setState({ deleteUserOpen: false, editUserOpen: false, createUserOpen: false })

    componentDidMount() {
        this.props.getUsers({ page: 1, per_page: 3 });
    }

    closeCreateConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, createUserOpen: true })
    }
    closeDeleteConfigShow = (closeOnEscape, closeOnDimmerClick, user) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, deleteUserOpen: true, deletingUser: user })
    }
    closeEditConfigShow = (closeOnEscape, closeOnDimmerClick, user) => () => {
        this.setState({
            closeOnEscape, closeOnDimmerClick, editUserOpen: true, editingUser: user
        })
    }

    handlePaginationChange = (e, { activePage }) => {
        this.props.getUsers({ page: activePage, per_page: 4 });
    }

    handleDeleteUser = () => {
        this.close()
        this.props.deleteUser(this.state.deletingUser.id);
    }

    render() {
        const { users } = this.props;
        const { deletingUser, editingUser, deleteUserOpen, editUserOpen, createUserOpen, closeOnEscape, closeOnDimmerClick} = this.state
        return (
            <ResponsiveContainer>
                <Container style={{ margin: '3em 0em 0em', padding: '3em 0em', minHeight: 'calc(100vh - 150px)' }}>
                    <Button onClick={this.closeCreateConfigShow(true, false)} icon labelPosition='left' floated="right">
                        <Icon name='user plus' />Add user</Button>
                    <Header>Users:</Header>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <Message color='red'>{users.error}</Message>}
                    {users.pages &&
                        <Grid container columns={3} doubling stackable>
                            {users.pages.data.map((user, index) =>
                                <Grid.Column key={user.id}>
                                    <Card style={{ width: 'none' }}>
                                        <Image src={user.avatar} wrapped ui={false} />
                                        <Card.Content>
                                            <Card.Header>{user.first_name + ' ' + user.last_name}</Card.Header>
                                            <Card.Description>{user.email}</Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <div className='ui two buttons'>
                                                <Button onClick={this.closeEditConfigShow(true, false, user)} basic color='green'>Edit</Button>
                                                <Button onClick={this.closeDeleteConfigShow(true, false, user)} basic color='red'>Delete</Button>
                                            </div>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            )}
                        </Grid>
                    }
                    
                    <Pagination floated='right'
                        activePage={users.pages && users.pages.page}
                        boundaryRange={1}
                        onPageChange={this.handlePaginationChange}
                        size='mini'
                        siblingRange={1}
                        totalPages={users.pages && users.pages.total_pages}
                        ellipsisItem={false ? undefined : null}
                        firstItem={true ? undefined : null}
                        lastItem={true ? undefined : null}
                        prevItem={true ? undefined : null}
                        nextItem={true ? undefined : null}
                    />
                    <Modal
                        size='tiny'
                        open={createUserOpen}
                        closeOnEscape={closeOnEscape}
                        closeOnDimmerClick={closeOnDimmerClick}
                        onClose={this.close}
                    >
                        <Modal.Header>Create User</Modal.Header>
                        <Modal.Content>

                            <Modal.Description>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        first_name: "",
                                        last_name: "",
                                        email: "",
                                        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg'
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={values => {
                                        this.close()
                                        this.props.createUser({ email: values.email, first_name: values.first_name, last_name: values.last_name, avatar: values.avatar });
                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, errors }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Input label='Email *' placeholder='Email' name='email' value={values.email} onChange={handleChange} error={errors.email} />
                                            <Form.Input label='first_name *' placeholder='first_name' name='first_name' value={values.first_name} onChange={handleChange} error={errors.first_name} />
                                            <Form.Input label='last_name *' placeholder='last_name' name='last_name' value={values.last_name} onChange={handleChange} error={errors.last_name} />
                                            <Form.Input disabled><div className="ui action input">
                                                <input type="file" />
                                                <button className="ui teal icon right labeled button">
                                                    <i aria-hidden="true" className="file icon"></i>
                                                    Open File </button>
                                            </div></Form.Input>
                                            <Button
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
                        size='tiny'
                        open={editUserOpen}
                        closeOnEscape={closeOnEscape}
                        closeOnDimmerClick={closeOnDimmerClick}
                        onClose={this.close}
                    >
                        <Modal.Header>Edit User Account</Modal.Header>
                        <Modal.Content>

                            <Modal.Description>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={editingUser}
                                    validationSchema={validationSchema}
                                    onSubmit={values => {
                                        this.close()
                                        this.props.updateUser({ email: values.email, first_name: values.first_name, last_name: values.last_name, id: values.id });
                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, errors }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Input label='Email *' placeholder='Email' name='email' value={values.email} onChange={handleChange} error={errors.email} />
                                            <Form.Input label='first_name *' placeholder='first_name' name='first_name' value={values.first_name} onChange={handleChange} error={errors.first_name} />
                                            <Form.Input label='last_name *' placeholder='last_name' name='last_name' value={values.last_name} onChange={handleChange} error={errors.last_name} />
                                            <Form.Input ><div className="ui action input">
                                                <input type="file" disabled />
                                                <button className="ui teal icon right labeled button">
                                                    <i aria-hidden="true" className="file icon"></i>
                                                    Open File </button>
                                            </div></Form.Input>
                                            <Button
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
                            <p>Are you sure you want to delete account <b>{deletingUser.first_name + ' ' + deletingUser.last_name}</b></p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.close} negative>No</Button>
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

function mapState(state) {
    const { users, authentication } = state;
    const { profil } = authentication;
    return { profil, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    getUser: userActions.getById,
    deleteUser: userActions.delete,
    updateUser: userActions.update,
    createUser: userActions.create
}

const connectedHomePage = connect(mapState, actionCreators)(UsersPage);
export { connectedHomePage as UsersPage };
