import { SessionsAttr } from "@services/sessions";

type SessionsAccessors = {
  customerMembershipId: SessionsAttr["customerMembershipId"];
  customerId: SessionsAttr["customerId"];
  customer: SessionsAttr["customer"];
  date: SessionsAttr["date"];
  attended: SessionsAttr["attended"];
  options: {
    attended: SessionsAttr["attended"];
    customerMembershipId: SessionsAttr["customerMembershipId"];
    membershiSessionpId: SessionsAttr["membershiSessionpId"];
  };
};

export type { SessionsAccessors };
