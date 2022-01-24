import { ReactNode, useEffect, useState } from "react";
import ReactModal from "react-modal";

const customStyles: ReactModal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    margin: "2.5rem -50% 0 0",
    transform: "translate(-50%, -50%)",
    background: "var(--white)",
    // background: "#F0F0F5",
    // color: "#000000",
    borderRadius: "8px",
    // width: "736px",
    border: "none",
    width: "80vw",
    maxHeight: "80%",
    overflowY: "auto",
  },
  overlay: {
    backgroundColor: "#121214e6",
    zIndex: 1,
  },
};

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, setIsOpen, children }: ModalProps) {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    if (modalStatus !== isOpen) {
      setModalStatus(isOpen);
    }
  }, [isOpen, modalStatus]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
}
