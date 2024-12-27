import React, { useState, useEffect } from 'react';

// Chakra imports
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';

import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import Link from 'components/link/Link';
import {
  name_validation,
  surname_validation,
  password_validation,
  email_validation,
} from './ValidationPatterns';

export default function SignupFlow({ onSubmit, loading }) {
  const [step, setStep] = useState(0);
  const [val1d, setVal1d] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    pa2word: '',
    conditionAccepted: false,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    phonePrefix: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
    pa2word: '',
    conditionAccepted: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  useEffect(() => {
    validate(form.phonePrefix);
    //console.log(form)
  }, [form]);

  /**
   * Will verify if form input are ok
   */
  const validate = (phonePrefix) => {
    const {
      email,
      password,
      pa2word,
      lastName,
      firstName,
      phoneNumber,
      conditionAccepted,
    } = form;

    const errors = {};

    // Validate email
    if (!email.match(email_validation?.validation.pattern.value)) {
      errors.email = email_validation.validation.pattern.message;
    }

    // Validate password
    if (!password.match(password_validation.validation.pattern.value)) {
      errors.password = password_validation.validation.pattern.message;
    }

    // Validate retype password
    if (password !== pa2word) {
      errors.pa2word = 'Passwords do not match';
    }

    // Validate first name
    if (firstName.length > name_validation.validation.maxLength.value) {
      errors.firstName = name_validation.validation.maxLength.message;
    }

    // Validate last name
    if (lastName.length > surname_validation.validation.maxLength.value) {
      errors.lastName = surname_validation.validation.maxLength.message;
    }

    // Validate phone number based on prefix
    const phonePattern = getPhonePattern(phonePrefix);
    if (!phoneNumber.match(phonePattern)) {
      errors.phoneNumber = 'Invalid phone number';
    }

    // Validate conditionAccepted
    if (!conditionAccepted) {
      errors.conditionAccepted = 'You must accept the terms and conditions';
    }

    setValidationErrors(errors);

    // Check if the form is valid
    const isFormValid = Object.keys(errors).length === 0;
    setVal1d(isFormValid);

    return isFormValid;
  };

  /**
   * Function to get phone pattern based on prefix
   * @param {*} prefix 
   * @returns 
   */
  const getPhonePattern = (prefix) => {
    switch (prefix) {
      case '+39': // IT phone number pattern
        return /^((3[1-6][0-9]))(\d{7})$/;
      case '+41': // CH phone number pattern
        return /^(?:(?:|0{1,2}|\+{0,2})41(?:|\(0\))|0?)((?:7[0-9])|(?:[1-6]\d))(?:\d{3})(?:\d{2})(?:\d{2})$/;
    }
  };

  /**
   * Switch to next step
   */
  const nextStep = () => {
    setStep(step < 1 ? step + 1 : step);
  };

  /**
   * Back to prev step
   */
  const prevStep = () => {
    setStep(step > 0 ? step - 1 : step);
  };

  /**
   * Handle submit
   */
  const handleSubmit = () => {
    /* if (validate()) { */
    onSubmit(form);
    /* } */
  };

  /**
   * will return the step fragment
   * @param {number} n - the step number
   * @returns the step
   */
  const getStep = (n) => {
    switch (n) {
      case 0:
        return (
          <>
            <h3 className='mb-3'>Step 1: Informazioni personali</h3>
            <FormStep1
              values={form}
              isFormValid={val1d}
              onNextStep={nextStep}
              onChange={(_e) => {
                setForm({ ...form, ..._e });
              }}
              validationErrors={validationErrors}
            />
          </>
        );
      case 1:
        return (
          <>
            <h3 className='mb-3'>Step 2: Ulteriori informazioni</h3>
            <FormStep2
              values={form}
              onPrevStep={prevStep}
              onChange={(_e) => setForm({ ...form, ..._e })}
            />
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      {getStep(step)}
      {step === 1 && (
        <>
          <Button
            variant='brand'
            fontSize='14px'
            fontWeight='500'
            w='100%'
            h='50'
            mb='24px'
            isDisabled={!val1d}
            onClick={handleSubmit}
            isLoading={loading}
            loadingText='Submitting'
          >
            Crea il mio account
          </Button>
        </>
      )}
    </>
  );
}

/**
 * Will return the first step of the form
 * @param {void} onChange
 * @param {object} values
 * @returns first step of form
 */
const FormStep1 = ({
  onChange,
  values,
  onNextStep,
  isFormValid,
  validationErrors,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const textColorSecondary = 'gray.400';
  // logic
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <FormControl
        isInvalid={
          !!validationErrors?.email ||
          !!validationErrors?.password ||
          !!validationErrors?.pa2word
        }
      >
        <FormLabel
          display='flex'
          ms='4px'
          fontSize='sm'
          fontWeight='500'
          color={textColor}
          mb='8px'
        >
          Email<Text color={brandStars}>*</Text>
        </FormLabel>
        <Input
          isRequired={true}
          variant='auth'
          fontSize='sm'
          type='email'
          placeholder='mail@evup.com'
          mb='24px'
          size='lg'
          value={values.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        {validationErrors?.email && values?.email && (
          <FormErrorMessage mt='-20px'>
            {validationErrors?.email}
          </FormErrorMessage>
        )}
        {/* <h1>{validationErrors?.email}</h1> */}

        {/* <FormHelperText>Non condivideremo mai la tua email.</FormHelperText> */}
        <FormLabel
          ms='4px'
          fontSize='sm'
          fontWeight='500'
          color={textColor}
          display='flex'
        >
          Password<Text color={brandStars}>*</Text>
        </FormLabel>
        <InputGroup size='md'>
          <Input
            isRequired={true}
            variant='auth'
            fontSize='sm'
            ms={{ base: '0px', md: '4px' }}
            placeholder='Min. 8 caratteri'
            mb='24px'
            size='lg'
            type={show ? 'text' : 'password'}
            value={values.password}
            onInput={(e) => onChange({ password: e.target.value })}
          />
          <InputRightElement display='flex' alignItems='center' mt='4px'>
            <Icon
              color={textColorSecondary}
              _hover={{ cursor: 'pointer' }}
              as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
              onClick={handleClick}
            />
          </InputRightElement>
        </InputGroup>
        {validationErrors?.password && values?.password && (
          <FormErrorMessage mt='-20px'>
            {validationErrors?.password}
          </FormErrorMessage>
        )}
        <FormLabel
          ms='4px'
          fontSize='sm'
          fontWeight='500'
          color={textColor}
          display='flex'
        >
          Retype password<Text color={brandStars}>*</Text>
        </FormLabel>
        <Input
          isRequired={true}
          variant='auth'
          fontSize='sm'
          ms={{ base: '0px', md: '4px' }}
          placeholder='Retype password'
          mb='24px'
          size='lg'
          type='password'
          value={values.pa2word}
          onInput={(e) => onChange({ pa2word: e.target.value })}
        />
        {validationErrors?.pa2word && values?.pa2word && (
          <FormErrorMessage mt='-20px'>
            {validationErrors?.pa2word}
          </FormErrorMessage>
        )}
        <Flex justifyContent='space-between' align='center' mb='24px'>
          <FormControl display='flex' alignItems='start'>
            <Checkbox
              id='remember-login'
              colorScheme='brand'
              me='10px'
              mt='3px'
              isChecked={values.conditionAccepted}
              onChange={(e) =>
                onChange({ conditionAccepted: e.target.checked })
              }
              isInvalid={!values.conditionAccepted}
            />
            <FormLabel
              htmlFor='remember-login'
              mb='0'
              fontWeight='normal'
              color={textColor}
              fontSize='sm'
            >
              Creando un account significa che accetti i{' '}
              <Link
                href={process.env.NEXT_PUBLIC_TERMS_CONDITION_LINK}
                fontWeight='500'
              >
                Termini e Condizioni,
              </Link>{' '}
              e il nostro{' '}
              <Link
                href={process.env.NEXT_PUBLIC_PRIVACY_POLICY_LINK}
                fontWeight='500'
              >
                Privacy Policy
              </Link>
            </FormLabel>
          </FormControl>
        </Flex>
        <Button
          variant='outline'
          fontSize='14px'
          fontWeight='500'
          w='100%'
          h='50'
          mb='24px'
          onClick={onNextStep}
          isDisabled={
            validationErrors?.email ||
            validationErrors?.password ||
            validationErrors?.pa2word ||
            validationErrors?.conditionAccepted
          }
        >
          Successivo
        </Button>
      </FormControl>
    </>
  );
};

/**
 * Will return a part of form
 * @param {void} onChange
 * @param {object} values
 * @param {void} onPrevStep
 * @returns the second step of form
 */
const FormStep2 = ({ onChange, values, onPrevStep, validationErrors }) => {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const phonePrefixes = ['+39', '+41'];
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ sm: '10px', md: '26px' }}>
        <Flex direction='column'>
          <FormLabel
            display='flex'
            ms='4px'
            fontSize='sm'
            fontWeight='500'
            color={textColor}
            mb='8px'
          >
            Nome<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            fontSize='sm'
            ms={{ base: '0px', md: '4px' }}
            placeholder='Nome'
            variant='auth'
            mb='24px'
            size='lg'
            value={values.firstName}
            onInput={(e) => onChange({ firstName: e.target.value })}
          />
          <FormErrorMessage>{validationErrors?.firstName}</FormErrorMessage>
        </Flex>
        <Flex direction='column'>
          <FormLabel
            display='flex'
            ms='4px'
            fontSize='sm'
            fontWeight='500'
            color={textColor}
            mb='8px'
          >
            Cognome<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant='auth'
            fontSize='sm'
            placeholder='Cognome'
            mb='24px'
            size='lg'
            value={values.lastName}
            onInput={(e) => onChange({ lastName: e.target.value })}
          />
          <FormErrorMessage>{validationErrors?.lastName}</FormErrorMessage>
        </Flex>
      </SimpleGrid>

      {/* OLD PHONE INSERT */}
      {/* <FormLabel
        display='flex'
        ms='4px'
        fontSize='sm'
        fontWeight='500'
        color={textColor}
        mb='8px'
      >
        Cellulare<Text color={brandStars}>*</Text>
      </FormLabel>
      <Input
        isRequired={true}
        variant='auth'
        fontSize='sm'
        type='phone'
        placeholder='333-3333-333'
        mb='24px'
        size='lg'
        value={values.phoneNumber}
        onInput={(e) => onChange({ phoneNumber: e.target.value })}
      />
      
      <FormErrorMessage>{validationErrors?.phoneNumber}</FormErrorMessage> */}

      {/* NEW PHONE INSERT */}

      <Flex direction='column'>
      
        <FormLabel
          display='flex'
          ms='4px'
          fontSize='sm'
          fontWeight='500'
          color={textColor}
          mb='8px'
        >
          Cellulare<Text color={brandStars}>*</Text>
        </FormLabel>
        
        <InputGroup>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ sm: '10px', md: '26px' }}>
          {/* <InputLeftAddon> */}
            <Select
              //flex='1'
              variant='auth'
              fontSize='sm'
              mb='24px'
              size='lg'
              value={values.phonePrefix}
              //style={{ paddingLeft: '3em', width: '100%' }}
              onChange={(e) => onChange({ phonePrefix: e.target.value })}
            >
              {phonePrefixes.map((prefix, index) => (
                <option key={index} value={prefix}>
                  {prefix}
                </option>
              ))}
            </Select>
            
          {/* </InputLeftAddon> */}
          
          <Input
            isRequired={true}
            variant='auth'
            fontSize='sm'
            type='phone'
            placeholder='333-3333-333'
            mb='24px'
            size='lg'
            value={values.phoneNumber}
            onInput={(e) => onChange({ phoneNumber: e.target.value })}
          />
          </SimpleGrid>
        </InputGroup>
        
        
        <FormErrorMessage>{validationErrors?.phoneNumber}</FormErrorMessage>
        
      </Flex>

      <Button
        variant='outline'
        fontSize='14px'
        fontWeight='500'
        w='100%'
        h='50'
        mb='24px'
        onClick={onPrevStep}
      >
        Precente
      </Button>
    </>
  );
};
