import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type ModalProps = {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  initialFocus?: React.MutableRefObject<HTMLElement | null>;
};

const Modal = ({
  children,
  open,
  onClose,
  initialFocus,
}: ModalProps): React.ReactElement => (
  <Transition as={Fragment} show={open}>
    <Dialog
      static
      open={open}
      onClose={onClose}
      initialFocus={initialFocus}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="min-h-screen text-center">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-800 bg-opacity-60"></div>
          </Dialog.Overlay>
        </Transition.Child>

        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-0 scale-95"
          enterTo="opacity-100 translate-y-0 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 scale-100"
          leaveTo="opacity-0 translate-y-0 scale-95"
        >
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block align-middle h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-middle bg-white rounded-3xl overflow-hidden shadow-xl transform transition-all p-4">
            {children}
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
);
const { Title: ModalTitle, Description: ModalDescription } = Dialog;

export { Modal, ModalTitle, ModalDescription };
