/* eslint-disable @typescript-eslint/no-unused-vars */
import { AiOutlineUser } from "react-icons/ai";
import { Button } from "@components/butons/button";
import { ErrorResponse } from "@services/common/types";
import { Form } from "@components/forms";
import { Input } from "@components/forms/controls";
import { isEmail } from "@utils/hooks/validations";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Fragment, useState } from "react";
import {
  useCompany,
  useCreateCompany,
  useEditCompany,
} from "@services/company";

type CompanyFormData = {
  name: string;
  description: string;
  image: Array<File>;
  address: string;
  phone: string;
  email: string;
  instagramSite: string;
  facebookSite: string;
};

const Company = (): React.ReactElement => {
  const history = useHistory();
  const { data, isLoading } = useCompany();
  const { mutateAsync: mutateCreate } = useCreateCompany();
  const { mutateAsync: mutateEdit } = useEditCompany(data ? data.id : "0");

  const { register, watch } = useForm<CompanyFormData>();
  const [base64, setBase64] = useState<string | ArrayBuffer | null>("");
  const uploadedPicture = watch("image");

  const handleOnSubmit = ({
    address,
    name,
    description,
    image,
    email,
    facebookSite,
    instagramSite,
    phone,
  }: CompanyFormData): void => {
    const reader = new FileReader();
    reader.readAsDataURL(uploadedPicture[0]);
    // eslint-disable-next-line functional/immutable-data
    reader.onload = () => {
      setBase64(reader.result);
    };

    if (data == undefined) {
      const companyPromise = mutateCreate({
        address,
        name,
        description,
        image: base64 as string,
        email,
        facebookSite,
        instagramSite,
        phone,
      });

      void toast.promise(companyPromise, {
        loading: "Creating your company...",
        success: () => {
          history.push("/");

          return "Your company has been created";
        },
        error: (err: ErrorResponse) => `${err.Message}`,
      });
    } else {
      const companyPromise = mutateEdit({
        address,
        name,
        description,
        image: base64 as string,
        email,
        facebookSite,
        instagramSite,
        phone,
      });

      void toast.promise(companyPromise, {
        loading: "Updating your company...",
        success: () => {
          return "Your company has been updated";
        },
        error: (err: ErrorResponse) => `${err.Message}`,
      });
    }
  };

  return (
    <Fragment>
      {isLoading || !data ? (
        <p>Loading...</p>
      ) : (
        <Form<CompanyFormData> onSubmit={handleOnSubmit}>
          <div className="flex flex-col items-center">
            <label htmlFor="profile-picture-upload">
              {uploadedPicture?.[0] || data.image ? (
                <img
                  src={
                    uploadedPicture?.[0]
                      ? URL.createObjectURL(uploadedPicture[0])
                      : data.image
                  }
                  alt="preview"
                  className="w-44 h-44 rounded-full object-cover cursor-pointer my-2"
                />
              ) : (
                <AiOutlineUser className="w-44 h-44 text-primary-100 bg-white rounded-full border-4 border-primary-100 object-cover cursor-pointer mb-12 mt-2" />
              )}
            </label>

            <input
              id="profile-picture-upload"
              type="file"
              defaultValue=""
              accept="image/png, image/jpeg"
              className="invisible w-0"
              {...register("image")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 mx-2 gap-y-5 md:mx-8  mb-5">
            <Input
              name="name"
              label="Nombre"
              placeholder="Insert your name"
              defaultValue={data.name}
              rules={{
                required: "We need your name",
              }}
            />
            <Input
              name="description"
              label="Descripción"
              placeholder="Insert your description"
              defaultValue={data.description}
              rules={{
                required: "We need your description",
              }}
            />
            <Input
              name="email"
              label="Email"
              placeholder="Insert your email"
              defaultValue={data.email}
              rules={{
                required: "We need your email email",
                validate: (value) => {
                  return isEmail(value) || "Please provide a valid email";
                },
              }}
              autoComplete="email"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 mx-2 gap-y-5 md:mx-8 mb-5">
            <Input
              name="address"
              label="Dirección"
              placeholder="Insert your address"
              defaultValue={data.address}
              rules={{
                required: "We need your address",
              }}
            />

            <Input
              name="phone"
              label="Teléfono"
              placeholder="Insert your phone"
              defaultValue={data.phone}
              rules={{
                required: "We need your phone",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 mx-2 gap-y-5 md:mx-8 mb-5">
            <Input
              name="instagramSite"
              label="Instagram"
              placeholder="Insert your instagram url"
              defaultValue={data.instagramSite}
            />
            <Input
              name="facebookSite"
              label="Facebook"
              placeholder="Insert your facebook url"
              defaultValue={data.facebookSite}
            />
          </div>
          <div className="flex justify-center items-center">
            <Button appearance="primary" type="submit" width="w-44">
              Guardar
            </Button>
          </div>
        </Form>
      )}
    </Fragment>
  );
};

export { Company };
