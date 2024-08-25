export const firstNameRules = [
  {
    required: true,
    message: "Please input your first name!",
    whitespace: true
  },
  {
    max: 50,
    message: "First name should not exceed 50 characters"
  }
];

export const lastNameRules = [
  {
    required: true,
    message: "Please input your last name!",
    whitespace: true
  },
  {
    max: 50,
    message: "Last name should not exceed 50 characters"
  }
];

export const userNameRules = [
  {
    required: true,
    message: "Please input your username!"
  },
  {
    min: 5,
    message: "Username should have minimum 5 characters"
  },
  {
    max: 16,
    message: "Username should not exceed 16 characters"
  }
];

export const passwordRules = [
  {
    required: true,
    message: "Please input your password!"
  },
  {
    min: 6,
    message: "Password should have minimum 6 characters"
  },
  {
    max: 50,
    message: "Password should not exceed 50 characters"
  },
  {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,16}$/i,
    message: "Password should be combination of at least one letter, one number and one special character"
  }
];
