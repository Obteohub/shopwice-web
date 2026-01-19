export const INPUT_FIELDS = [
  {
    id: 0,
    label: 'First Name',
    name: 'firstName',
    customValidation: { required: true, minLength: 4 },
  },
  {
    id: 1,
    label: 'Last Name',
    name: 'lastName',
    customValidation: { required: true, minLength: 4 },
  },
  {
    id: 2,
    label: 'Address',
    name: 'address1',
    customValidation: { required: true, minLength: 4 },
  },
  {
    id: 3,
    label: 'Country / Region',
    name: 'country',
    customValidation: { required: true },
  },
  {
    id: 7,
    label: 'State / County',
    name: 'state',
    customValidation: { required: false },
  },
  {
    id: 4,
    label: 'City',
    name: 'city',
    customValidation: { required: true, minLength: 2 },
  },
  {
    id: 5,
    label: 'Email',
    name: 'email',
    customValidation: { required: true, type: 'email' },
  },
  {
    id: 6,
    label: 'Phone',
    name: 'phone',
    customValidation: { required: true, minLength: 8, pattern: /^[+0-9]{8,12}$/ },
  },
];
