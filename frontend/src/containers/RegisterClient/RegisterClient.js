import React, { Component } from 'react';
import Card from '../../hoc/Card/Card';
import Input from '../../components/Common/Input/Input';
import Button from '../../components/Common/Button/Button';

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
                    required: true,
                    minLength: 3
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
        console.log("Submitting form");
    }

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
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        return isValid;
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
            </Card>
        )
    }
}


export default RegisterClient;