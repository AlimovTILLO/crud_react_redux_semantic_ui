import React from 'react';
import { Link } from 'react-router-dom';
import { Dimmer, Loader, Segment, Form, Button, Grid, Header, Message } from 'semantic-ui-react'
import { Formik } from "formik";
import * as Yup from "yup";


import './style.css'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email недействителен")
        .required("Требуется электронная почта"),
    password: Yup.string()
        .min(10, "Пароль должен содержать не менее 10 символов")
        .required("Необходим пароль")
})


export class LoginPage extends React.Component {
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

                    <Grid textAlign='center' className='main-grid' verticalAlign='middle'>
                        <Grid.Column className='main-grid__column'>
                            <Header as='h2' color='teal' textAlign='center'>Log-in to the system</Header>
                            <Form onSubmit={handleSubmit}>
                                <Segment stacked>
                                    <Form.Input icon='user' iconPosition='left' placeholder='Email' name='email' value={values.email} onChange={handleChange} error={errors.email} />
                                    <Form.Input icon='lock' iconPosition='left' type='password' name='password' value={values.password} placeholder='Password' onChange={handleChange} error={errors.password} />
                                    <Button type="submit" color='teal' fluid size='large' className="btn btn-primary" disabled={
                                        (errors.email || !values.email) || (errors.password || !values.password) ? true : false} >Login</Button>

                                </Segment>
                            </Form>
                            {loggingIn &&
                                <Dimmer active inverted>
                                    <Loader size='large'>Loading</Loader>
                                </Dimmer>
                            }
                            <Message>
                                New to us? <Link to="/register" className="btn btn-link">Register</Link>
                            </Message>
                        </Grid.Column>
                    </Grid>
                )}
            </Formik>
        );
    }
}

