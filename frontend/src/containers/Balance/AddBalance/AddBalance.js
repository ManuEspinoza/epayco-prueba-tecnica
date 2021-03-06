import React, { Component } from 'react';
import Card from '../../../hoc/Card/Card';
import Input from '../../../components/Common/Input/Input';
import Button from '../../../components/Common/Button/Button';
import axios from '../../../axios-instance';
import notifySuccess from '../../../components/Common/Notifications/NotifySuccess/notifySuccess';
import notifyError from '../../../components/Common/Notifications/NotifyError/notifyError';
import { ToastContainer } from 'react-toastify';

class AddBalance extends Component {
    state = {
        addBalanceForm: {
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
            },
            balance: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Ingrese un monto'
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

    submitFormHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.addBalanceForm) {
            formData[formElementIdentifier] = this.state.addBalanceForm[formElementIdentifier].value;
        }
        formData.balance = parseInt(formData.balance);
        axios.post('/add-balance', formData)
            .then(response => {
                notifySuccess(this.message(response.data.message));
                this.cleanForm();
            })
            .catch(error => {
                notifyError(this.message(error.response.data.message));
            });
    }

    message = (message) => (<p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{message}</p>);

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedaddBalanceForm = {
            ...this.state.addBalanceForm
        }
        const updatedFormElement = {
            ...updatedaddBalanceForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedaddBalanceForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedaddBalanceForm) {
            formIsValid = updatedaddBalanceForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ addBalanceForm: updatedaddBalanceForm, isFormValid: formIsValid })
    }

    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    cleanForm = () => {
        const cleanForm = { ...this.state.addBalanceForm };
        cleanForm.phone.value = '';
        cleanForm.identification.value = '';
        cleanForm.balance.value = '';
        this.setState({
            addBalanceForm: cleanForm,
            isFormValid: false
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.addBalanceForm) {
            formElementsArray.push({
                id: key,
                config: this.state.addBalanceForm[key]
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
                <Button disabled={!this.state.isFormValid}>Recargar saldo</Button>
            </form>
        );

        return (
            <Card>
                <h4>Recarga tu saldo</h4>
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


export default AddBalance;