import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfirmModal = ({
  adminConfirm,
  content,
  openConfirmModal,
  setOpenConfirmModal,
}) => {
  const confirm = () => {
    adminConfirm();
  };
  return (
    <div>
      <Modal isOpen={openConfirmModal} centered>
        <ModalHeader>Confirm Modal</ModalHeader>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => confirm()}>
            Confirm
          </Button>
          <Button color="danger" onClick={() => setOpenConfirmModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
