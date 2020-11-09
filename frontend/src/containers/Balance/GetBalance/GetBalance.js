import React, { Component } from 'react';
import Card from '../../../hoc/Card/Card';
import Input from '../../../components/Common/Input/Input';
import Button from '../../../components/Common/Button/Button';
import axios from '../../../axios-instance';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notifySuccess from '../../../components/Common/Notifications/NotifySuccess/notifySuccess';
import notifyError from '../../../components/Common/Notifications/NotifyError/notifyError';

class GetBalance extends Component {
    state = {
        getBalanceForm: {
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
        isFormValid: false
    }

    message = (message) => (<p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{message}</p>);

    submitFormHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.getBalanceForm) {
            formData[formElementIdentifier] = this.state.getBalanceForm[formElementIdentifier].value;
        }
        axios.post('/balance', formData)
            .then(response => {
                const message = this.message(`Tienes un saldo de ${response.data.balance}$`);
                notifySuccess(message);
                this.cleanForm();
            })
            .catch(error => {
                notifyError(this.message(error.response.data.message));
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedgetBalanceForm = {
            ...this.state.getBalanceForm
        }
        const updatedFormElement = {
            ...updatedgetBalanceForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedgetBalanceForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedgetBalanceForm) {
            formIsValid = updatedgetBalanceForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ getBalanceForm: updatedgetBalanceForm, isFormValid: formIsValid })
    }

    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    cleanForm = () => {
        const cleanForm = { ...this.state.getBalanceForm };
        cleanForm.phone.value = '';
        cleanForm.identification.value = '';
        this.setState({
            getBalanceForm: cleanForm,
            isFormValid: false
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.getBalanceForm) {
            formElementsArray.push({
                id: key,
                config: this.state.getBalanceForm[key]
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
                <Button disabled={!this.state.isFormValid}>Consultar saldo</Button>
            </form>
        );

        return (
            <Card>
                <h4>Consulta tu saldo</h4>
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


export default GetBalance;