import React from 'react';
import { Link } from 'react-router-dom';
import { Dimmer, Loader, Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
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


export class RegisterPage extends React.Component {

    render() {
        const { registering } = this.props;
        return (
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    submitted: false
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    this.setState({ submitted: true });
                    if (values.email && values.password) {
                        this.props.register(values);
                    }
                }}
            >
                {({ handleSubmit, handleChange, values, errors }) => (
                    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>Register</Header>
                            <Form onSubmit={handleSubmit}>
                                <Segment stacked>
                                    <Form.Input icon='user' iconPosition='left' placeholder='Email' name='email' value={values.email} onChange={handleChange} error={errors.email} />
                                    <Form.Input icon='lock' iconPosition='left' type='password' name='password' value={values.password} placeholder='Password' onChange={handleChange} error={errors.password} />
                                    <Button type="submit" color='teal' fluid size='large' className="btn btn-primary" disabled={
                                        (errors.email || !values.email) || (errors.password || !values.password)}>Register</Button>
                                    {registering &&
                                        <Dimmer active inverted>
                                            <Loader size='large'>Loading</Loader>
                                        </Dimmer>
                                    }
                                    <Link to="/login" className="btn btn-link">Cancel</Link>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                )}
            </Formik>
        );
    }
}