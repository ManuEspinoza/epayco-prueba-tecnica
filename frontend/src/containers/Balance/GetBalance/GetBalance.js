import React, { Component } from 'react';
import Card from '../../../hoc/Card/Card';
import Input from '../../../components/Common/Input/Input';
import Button from '../../../components/Common/Button/Button';
import axios from '../../../axios-instance';

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

    submitFormHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let formElementIdentifier in this.state.getBalanceForm) {
            formData[formElementIdentifier] = this.state.getBalanceForm[formElementIdentifier].value;
        }
        axios.post('/balance', formData)
            .then(response => {
                console.log(response);
                alert(`Tu saldo es de ${response.data.balance}$`);
                this.cleanForm();
            })
            .catch(error => {
                alert(error.response.data.message);
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
                <h4>Consultar saldo</h4>
                {form}
            </Card>
        )
    }
}


export default GetBalance;