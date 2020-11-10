import React, { Component } from 'react';
import Card from '../../hoc/Card/Card';
import Input from '../../components/Common/Input/Input';
import Button from '../../components/Common/Button/Button';
import axios from '../../axios-instance';
import notifySuccess from '../../components/Common/Notifications/NotifySuccess/notifySuccess';
import notifyError from '../../components/Common/Notifications/NotifyError/notifyError';
import { ToastContainer } from 'react-toastify';

class RegisterClient extends Component {
    state = {
        registerForm: {
            identification: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Ingrese su documento de identificación'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Campo obligatorio'
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Ingrese su nombre completo'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Campo obligatorio'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Ingrese su correo'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Campo obligatorio'
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Ingrese su número de telefono'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Campo obligatorio'
            }
        },
        loading: false,
        isFormValid: false
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.registerForm) {
            formData[formElementIdentifier] = this.state.registerForm[formElementIdentifier].value;
        }
        axios.post('/register', formData)
            .then(response => {
                this.setState({ loading: false });
                notifySuccess(this.message(response.data.message));
                this.cleanForm();
            })
            .catch(error => {
                notifyError(this.message(error.response.data.message));
            });
    }

    message = (message) => (<p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{message}</p>);

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedRegisterForm = {
            ...this.state.registerForm
        }
        const updatedFormElement = {
            ...updatedRegisterForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedRegisterForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedRegisterForm) {
            formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ registerForm: updatedRegisterForm, isFormValid: formIsValid })
    }

    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    cleanForm = () => {
        const cleanForm = { ...this.state.registerForm };
        cleanForm.phone.value = '';
        cleanForm.identification.value = '';
        cleanForm.email.value = '';
        cleanForm.name.value = '';
        this.setState({
            registerForm: cleanForm,
            isFormValid: false
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.registerForm) {
            formElementsArray.push({
                id: key,
                config: this.state.registerForm[key]
            });
        }

        let form = (
            <form onSubmit={this.submitFormHandler}>
                {formElementsArray.map((formElement) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        errorMessage={formElement.config.errorMessage}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button disabled={!this.state.isFormValid}>Registrarse</Button>
            </form>
        );

        return (
            <Card>
                <h4>¡Regístrate!</h4>
                {form}
                <ToastContainer
                    position="top-center"
                    autoClose={8000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Card>
        )
    }
}


export default RegisterClient;