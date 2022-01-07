import { DimensionAttr } from "@services/customers";

type DimensionAccessors = {
  weight: DimensionAttr["weight"];
  height: DimensionAttr["height"];
  createdDate: DimensionAttr["createdDate"];
  id: DimensionAttr["id"];
};

export type { DimensionAccessors };
