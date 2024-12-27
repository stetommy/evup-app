export const name_validation = {
  name: 'name',
  label: 'name',
  type: 'text',
  id: 'name',
  placeholder: 'write your name ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
};

export const surname_validation = {
  name: 'surname',
  label: 'surname',
  type: 'text',
  id: 'surname',
  placeholder: 'write your surname',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 10,
      message: '10 characters max',
    },
  },
};

export const password_validation = {
  name: 'password',
  label: 'password',
  type: 'password',
  id: 'password',
  placeholder: 'type password ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      message:
        'Password must have at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long.',
    },
  },
};

export const phone_validation = {
  name: 'num',
  label: 'number',
  type: 'phone',
  id: 'num',
  placeholder: 'write phone number',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value: /^(([+])39)?((3[1-6][0-9]))(\d{7})$/,
      message: 'not valid',
    },
  },
};

export const email_validation = {
  name: 'email',
  label: 'email address',
  type: 'email',
  id: 'email',
  placeholder: 'write email address',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Please enter valid email',
    },
  },
};
