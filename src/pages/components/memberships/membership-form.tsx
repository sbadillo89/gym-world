import { Anchor } from "@components/butons/anchor";
import { Button } from "@components/butons/button";
import { Checkbox } from "@components/checkbox";
import { Form } from "@components/forms";
import { Input } from "@components/forms/controls";
import { MembershipAttr } from "@services/memberships";

type MembershipFormProps = {
  operation: "Edit" | "Save";
  onSumbit?: (membership: MembershipAttr) => void;
  data?: MembershipAttr;
  close?: () => void;
};

const MembershipForm = ({
  data,
  operation,
  close,
  onSumbit,
}: MembershipFormProps): React.ReactElement => {
  return (
    <Form onSubmit={onSumbit}>
      <div className="flex flex-col gap-y-4">
        <Input
          name="description"
          label="Descripción"
          placeholder="Ingrese una descripción"
          defaultValue={data && data.description}
          rules={{
            required: "La descripción es requerida",
          }}
        />
        <Input
          name="validityDays"
          label="Vigencia (días)"
          placeholder="Ingrese una vigencia"
          type="number"
          defaultValue={data && data.validityDays.toString()}
          rules={{
            required: "La vigencia es requerida ej:15",
          }}
        />
        <Input
          name="price"
          label="Precio"
          placeholder="Ingrese un precio"
          defaultValue={data && data.price.toString()}
          rules={{
            required: "El precio es requerido",
          }}
          type="number"
        />
        <Input
          name="discount"
          label="Descuento"
          placeholder="Ingrese un descuento"
          defaultValue={data && data.discount.toString()}
          type="number"
        />
        {operation == "Edit" && (
          <Checkbox
            name="active"
            label="Activo"
            defaultChecked={data && data.active}
          />
        )}
      </div>
      <div className="flex justify-evenly mt-8 gap-3">
        <Button type="submit" width="w-44" appearance="primary">
          Guardar
        </Button>
        {operation == "Edit" ? (
          <Anchor width="w-44" appearance="primary" to="/memberships">
            Regresar
          </Anchor>
        ) : (
          <Button
            width="w-44"
            appearance="primary"
            type="button"
            onClick={close}
          >
            Cerrar
          </Button>
        )}
      </div>
    </Form>
  );
};

export { MembershipForm };
