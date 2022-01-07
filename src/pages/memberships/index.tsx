import { MembershipModalAdd } from "./membership-modal-add";
import { MembershipsTable } from "./memberships-table";

const Memeberships = (): React.ReactElement => {
  return (
    <div>
      <MembershipsTable />
      <MembershipModalAdd />
    </div>
  );
};

export { Memeberships };
