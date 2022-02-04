import { Anchor } from "@components/butons/anchor";
import { Button } from "@components/butons/button";
import { CustomerAttr } from "@services/customers";
import { Form } from "@components/forms";
import dayjs from "dayjs";
import { Input, Select } from "@components/forms/controls";

type CustomerFormData = Omit<
  CustomerAttr,
  "id" | "lastActivity" | "createdDate" | "createdBy"
>;

type CustomerFormProps = {
  onSubmit: (data: CustomerFormData) => void;
  close?: () => void;
  textOperation: "Guardar" | "Guardar Cambios";
  data?: CustomerFormData;
  enableClose?: boolean;
};

const CustomerForm = ({
  onSubmit,
  close,
  textOperation = "Guardar",
  data,
  enableClose = false,
}: CustomerFormProps): React.ReactElement => {
  return (
    <Form<CustomerFormData> onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-3">
        <Input
          name="firstName"
          label="Nombre(s)"
          defaultValue={data && data.firstName}
          placeholder="Ingresa tu nombre"
          rules={{
            required: "El nombre es requerido",
          }}
        />
        <Input
          name="lastName"
          label="Apellido(s)"
          defaultValue={data && data.lastName}
          placeholder="Ingresa tu(s) apellido(s)"
          rules={{
            required: "El apellido es requerido",
          }}
        />
        <Input
          name="age"
          label="Edad"
          defaultValue={data && data.age.toString()}
          placeholder="Ingresa tu edad"
          type="number"
          rules={{
            required: "La edad es requerida",
          }}
        />
        <Input
          name="address"
          label="Dirección"
          placeholder="Ingresatu dirección"
          defaultValue={data && data.address}
        />
        <Select
          name="gender"
          label="Género"
          placeholder="-- seleccione --"
          options={["Masculino", "Femenino"]}
          defaultValue={data && data.gender}
          rules={{
            required: "El género es requerido",
          }}
        />
        <Input
          name="phone"
          label="Télefono"
          placeholder="Ingresa tu teléfono"
          type="number"
          defaultValue={data && data.phone.toString()}
          rules={{
            required: "El télefono es requerido",
          }}
        />
        <Input
          name="dateOfBirth"
          label="Fecha Nacimiento"
          type="date"
          defaultValue={data && dayjs(data.dateOfBirth).format("YYYY-MM-DD")}
        />
      </div>
      <div className="flex justify-evenly mt-8 gap-3">
        <Button type="submit" width="w-44" appearance="primary">
          {textOperation}
        </Button>
        {enableClose ? (
          <Button
            type="button"
            width="w-44"
            appearance="primary"
            onClick={close}
          >
            Cerrar
          </Button>
        ) : (
          <Anchor width="w-44" appearance="primary" to="/customers">
            Regresar
          </Anchor>
        )}
      </div>
    </Form>
  );
};

export { CustomerForm };
export type { CustomerFormData };
