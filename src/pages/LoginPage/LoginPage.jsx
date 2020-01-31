import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dimmer, Loader, Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import { userActions } from '../../actions';
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email недействителен")
        .required("Требуется электронная почта"),
    password: Yup.string()
        .min(10, "Пароль должен содержать не менее 10 символов")
        .required("Необходим пароль")
})


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.logout();
    }

    render() {
        const { loggingIn } = this.props;
        return (
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    submitted: false
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    this.setState({ submitted: true })
                    if (values.email && values.password) {
                        this.props.login(values.email, values.password);
                    }
                }}
            >
                {({ handleSubmit, handleChange, values, errors }) => (

                    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>Log-in to the system</Header>
                            <Form onSubmit={handleSubmit}>
                                <Segment stacked>
                                    <Form.Input icon='user' iconPosition='left' placeholder='Email' name='email' value={values.email} onChange={handleChange} error={errors.email} />
                                    <Form.Input icon='lock' iconPosition='left' type='password' name='password' value={values.password} placeholder='Password' onChange={handleChange} error={errors.password} />
                                    <Button type="submit" color='teal' fluid size='large' className="btn btn-primary" disabled={
                                        (errors.email || !values.email) || (errors.password || !values.password)} >Login</Button>

                                </Segment>
                            </Form>
                            {loggingIn &&
                                <Dimmer active inverted>
                                    <Loader size='large'>Loading</Loader>
                                </Dimmer>
                            }
                            {/* <Message>
                                New to us? <Link to="/register" className="btn btn-link">Register</Link>
                            </Message> */}
                        </Grid.Column>
                    </Grid>
                )}
            </Formik>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };