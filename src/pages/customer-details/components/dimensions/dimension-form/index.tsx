import { Form } from "@components/forms";
import { Input } from "@components/forms/controls";
import React from "react";

type DimensionFormData = {
  height: number;
  weight: number;
};

type DimensionFormProps = {
  onSubmit: (data: DimensionFormData) => void;
  onClose: () => void;
};

const DimensionForm = ({
  onSubmit,
  onClose,
}: DimensionFormProps): React.ReactElement => {
  return (
    <Form<DimensionFormData> onSubmit={onSubmit}>
      <Input
        name="height"
        label="Altura"
        placeholder="Ingrese su altura (cms)"
        type="number"
        step="0.1"
      />
      <Input
        name="weight"
        label="Peso"
        placeholder="Ingrese su peso (kg)"
        type="text"
      />
      <div className="flex justify-between ">
        <button
          className="h-6 w-24 sm:h-8 sm:w-28 bg-primary-100 text-white mt-5 hover:bg-primary-200"
          type="submit"
        >
          Guardar
        </button>

        <input
          type="button"
          className="h-6 w-24 sm:h-8 sm:w-28 bg-primary-100 text-white mt-5 hover:bg-primary-200"
          onClick={onClose}
          value="Cerrar"
        />
      </div>
    </Form>
  );
};

export { DimensionForm };
export type { DimensionFormData };
