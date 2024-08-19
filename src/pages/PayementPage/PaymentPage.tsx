/* eslint-disable no-unused-vars */
import React, {
  useState,
  useRef,
  ChangeEvent,
  FocusEvent,
  FormEvent,
} from 'react';
import Card, { Focused } from 'react-credit-cards';
import SupportedCards from './Cards';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from './utils';

import 'react-credit-cards/es/styles-compiled.css';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

interface FormData {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  issuer: string;
  focused: any;
  formData: any;
}

const PaymentPage: React.FC = () => {
  const [state, setState] = useState<FormData>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleCallback = ({ issuer }: { issuer: string }, isValid: boolean) => {
    if (isValid) {
      setState((prevState) => ({ ...prevState, issuer }));
    }
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      focused: e.target.name as Focused,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;

    let newName = value;

    if (inputName === 'number') {
      newName = formatCreditCardNumber(value);
    } else if (inputName === 'expiry') {
      newName = formatExpirationDate(value);
    } else if (inputName === 'cvc') {
      newName = formatCVC(value);
    }

    setState((prevState) => ({ ...prevState, [inputName]: newName }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { issuer } = state;
    const formData = Array.from(e.currentTarget.elements)
      .filter((d) => (d as HTMLInputElement).name)
      .reduce((acc: any, d) => {
        const input = d as HTMLInputElement;

        return {
          ...acc,
          [input.name]: input.value,
        };
      }, {});

    setState((prevState) => ({ ...prevState, formData }));
    formRef.current?.reset();
  };

  const { name, number, expiry, cvc, focused, issuer, formData } = state;

  return (
    <div key="Payment">
      <div className="App-payment">
        <Typography variant="h2">Checkout Page</Typography>
        <Box sx={{ marginBottom: '30px' }}>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={handleCallback}
          />
        </Box>

        <form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="number"
                label="Nuléro de la carte"
                variant="outlined"
                fullWidth
                placeholder="Card Number"
                inputProps={{
                  pattern: '[\\d| ]{16,22}',
                  maxLength: 22,
                  minLength: 16,
                }}
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="name"
                label="Nom sur la carte"
                variant="outlined"
                fullWidth
                placeholder="Name"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="tel"
                name="expiry"
                label="Date de validité"
                variant="outlined"
                fullWidth
                placeholder="MM/YY"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="tel"
                name="cvc"
                label="CVC"
                variant="outlined"
                fullWidth
                placeholder="CVC"
                inputProps={{
                  pattern: '\\d{3,4}',
                  maxLength: 4,
                }}
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Grid>
            <Grid item xs={12}>
              <input type="hidden" name="issuer" value={issuer} />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                PAY
              </Button>
            </Grid>
          </Grid>
        </form>
        {formData && (
          <Grid item xs={12}>
            <div className="App-highlight">
              {formatFormData(formData).map((d: string, i: number) => (
                <Box key={i}>{d}</Box>
              ))}
            </div>
          </Grid>
        )}
        <SupportedCards />
      </div>
    </div>
  );
};

export default PaymentPage;
