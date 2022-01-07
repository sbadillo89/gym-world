import { CustomerModalAdd } from "./customer-modal-add";
import { CustomersTable } from "./customers-table";
import { Fragment } from "react";

const Customers = (): React.ReactElement => {
  return (
    <Fragment>
      <CustomersTable />
      <CustomerModalAdd />
    </Fragment>
  );
};

export { Customers };
