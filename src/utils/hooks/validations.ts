const isEmail = (value: string): boolean => {
  // eslint-disable-next-line
  const emailRegex =
    // eslint-disable-next-line no-useless-escape
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(value);
};

/**
 * This function checks for the value to have:
 * @description At least 8 characters.
 * @description 1 capital letter.
 * @description 1 lowercase letter.
 * @description 1 number.
 * @description 1 symbol `(*#@$%!)`.
 */
const isSecurePassword = (value: string): boolean => {
  // eslint-disable-next-line
  const securePasswordRegex =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  return securePasswordRegex.test(value);
};

export { isEmail, isSecurePassword };
