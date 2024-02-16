import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import "./modal.css";
import { Button } from "../form/Button"; // Ensure you have a Modal.css file for styling

export interface IModal extends UseDisclosureProps {
  title?: string | ReactNode;
  primaryButtonLabel?: string | ReactNode;
  primaryButtonEnabled?: boolean;
  onPrimaryButtonClick?: () => any;
  // closeButtonLabel?: string | ReactNode;
  // showPrimaryButton?: boolean;
  // showCloseButton?: boolean;
  // showModalHeading?: boolean;
  // isPrimaryButtonLoading?: boolean;
  [x: string]: any; // this for UseDisclosureProps
}

interface UseDisclosureProps {
  isOpen?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  onOpen?: () => void;
  onClose?: () => void;
}

const useDisclosure = ({
  defaultIsOpen = false,
}: {
  defaultIsOpen?: boolean;
} = {}): UseDisclosureProps => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  return { isOpen, onOpen, onClose };
};

export function Modal(props: PropsWithChildren<IModal>) {
  const {
    title,
    isOpen,
    onClose,
    children,
    primaryButtonLabel,
    primaryButtonEnabled,
    onPrimaryButtonClick,
  } = props;
  if (!isOpen) return null;

  return !isOpen ? null : (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-heading">
          <h2>{title}</h2>
          <Button className="modal-close" onClick={() => onClose?.()}>
            ×
          </Button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <Button
            className="modal-close"
            onClick={() => onPrimaryButtonClick?.()}
            // @ts-ignore
            disabled={!primaryButtonEnabled}
          >
            {primaryButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface IModalContext {
  modalProps: IModal;
  modalDisclosure: UseDisclosureProps | Record<any, any>;
  setModalProps: React.Dispatch<React.SetStateAction<IModal>>;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalContext = createContext<IModalContext>({
  modalProps: {},
  modalDisclosure: {},
  setModalProps: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export const useModal = (): IModalContext => {
  const [modalProps, setModalProps] = useState<IModal>({});
  const modalDisclosure = useDisclosure();

  return { modalProps, modalDisclosure, setModalProps };
};

export function ModalProvider({
  children,
  ...props
}: PropsWithChildren<IModalContext>) {
  return (
    <ModalContext.Provider value={props}>{children}</ModalContext.Provider>
  );
}
