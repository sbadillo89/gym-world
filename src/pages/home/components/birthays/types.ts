import { CustomerBirthdaysAttr } from "@services/customers";

type CustomerBirthdaysAccessors = {
  customerId: CustomerBirthdaysAttr["id"];
  customer: CustomerBirthdaysAttr["firstName"] &
    CustomerBirthdaysAttr["lastName"];
  date: CustomerBirthdaysAttr["dateOfBirth"];
};

export type { CustomerBirthdaysAccessors };
