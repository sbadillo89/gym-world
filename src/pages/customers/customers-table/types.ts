import { CustomerAttr } from "@services/customers";

type CustomersAccessors = {
  id: CustomerAttr["id"];
  firstName: CustomerAttr["firstName"];
  lastName: CustomerAttr["lastName"];
  age: CustomerAttr["age"];
  gender: CustomerAttr["gender"];
  phone: CustomerAttr["phone"];
  address: CustomerAttr["address"];
  birthday: CustomerAttr["dateOfBirth"];
  options: CustomerAttr["id"];
};

export type { CustomersAccessors };
