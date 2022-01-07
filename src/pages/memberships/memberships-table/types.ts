import { MembershipAttr } from "@services/memberships";

type MembershipAccessors = {
  id: MembershipAttr["id"];
  description: MembershipAttr["description"];
  validityDays: MembershipAttr["validityDays"];
  price: MembershipAttr["price"];
  discount: MembershipAttr["discount"];
  active: MembershipAttr["active"];
  createdDate: MembershipAttr["createdDate"];
};

export type { MembershipAccessors };
