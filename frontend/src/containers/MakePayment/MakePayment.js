import React, { Component } from 'react';
import Card from '../../hoc/Card/Card';
import Input from '../../components/Common/Input/Input';
import Button from '../../components/Common/Button/Button';
import axios from '../../axios-instance';
import notifyError from '../../components/Common/Notifications/NotifyError/notifyError';
import { ToastContainer } from 'react-toastify';
import notifySuccess from '../../components/Common/Notifications/NotifySuccess/notifySuccess';

class MakePayment extends Component {
    state = {
        form: [
            {
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
            {
                code: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Ingrese la clave de 6 digitos'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    errorMessage: 'Campo obligatorio'
                }
            }
        ],
        step: 0,
        phone: null,
        identification: null,
        isFormValid: false
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.form[this.state.step]) {
            formData[formElementIdentifier] = this.state.form[this.state.step][formElementIdentifier].value;
        }
        let url = '/payment';
        if (this.state.step === 1) {
            url = 'confirm-payment';
            formData.phone = this.state.phone;
            formData.identification = this.state.identification;
        }
        axios.post(url, formData)
            .then(response => {
                switch (this.state.step) {
                    case 0:
                        notifySuccess(this.message(response.data.message));
                        this.setState({ phone: response.data.clientPhone, identification: response.data.clientIdentification });
                        this.cleanForm();
                        this.setState({ step: 1 });
                        break;
                    case 1:
                        notifySuccess(this.message(response.data.message));
                        this.cleanForm();
                        this.setState({ step: 0 });
                        break;
                    default:
                        notifyError(this.message("¡Algo salio mal!"));
                        this.cleanForm();
                        this.setState({ step: 0 });
                        break;
                }
            })
            .catch(error => {
                notifyError(this.message(error.response.data.message));
            });
    }

    message = (message) => (<p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{message}</p>);

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedmakePaymentForm = {
            ...this.state.form[this.state.step]
        }
        const updatedFormElement = {
            ...updatedmakePaymentForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedmakePaymentForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedmakePaymentForm) {
            formIsValid = updatedmakePaymentForm[inputIdentifier].valid && formIsValid;
        }
        const otherForms = [...this.state.form];
        otherForms[this.state.step] = updatedmakePaymentForm;
        this.setState({ form: [...otherForms], isFormValid: formIsValid });
    }

    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    cleanForm = () => {
        const cleanForm = { ...this.state.form[this.state.step] };

        switch (this.state.step) {
            case 0:
                cleanForm.phone.value = '';
                cleanForm.identification.value = '';
                cleanForm.balance.value = '';
                break;
            case 1:
                cleanForm.code.value = '';
                break;
            default:
                cleanForm.phone.value = '';
                cleanForm.identification.value = '';
                cleanForm.balance.value = '';
                break;
        }

        const otherForms = [...this.state.form];
        otherForms[this.state.step] = cleanForm;
        this.setState({ form: [...otherForms], isFormValid: false });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.form[this.state.step]) {
            formElementsArray.push({
                id: key,
                config: this.state.form[this.state.step][key]
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
                <Button disabled={!this.state.isFormValid}>
                    {this.state.step === 0 ? 'Realizar pago' : 'Confirmar pago'}
                </Button>
            </form>
        );

        return (
            <Card>
                <h4>{this.state.step === 0 ? '¡Realiza un pago!' : '¡Confirma tu pago!'}</h4>
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


export default MakePayment;