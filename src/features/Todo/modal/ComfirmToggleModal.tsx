import React from "react";
import Modal from "react-modal";
import styles from "./modal.module.css";
import { Button } from "../../../components/Button/Button";
import btn from "../../../components/Button/Button.module.css";
import classnames from "classnames";
interface ComfirmToggleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmToggleModal: React.FC<ComfirmToggleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-overlay custom-modal"
    >
      <div className={styles["confirm-box"]}>
        <form onSubmit={handleConfirm}>
          <div className="user-box">
            <i className="fa-regular fa-circle-check confirm-finish"></i>
            <h1 className={styles.title2}>Are you sure</h1>
            <div className={styles.text}>
              To finish this task? <br></br>
              <b>This action can&apos;t be redo!</b>
            </div>
            <br></br>
          </div>
          <Button
            onClick={onClose}
            className={classnames(btn["btn-group"], btn["btn-cancel"])}
          >
            Cancel
          </Button>
          <button
            type="submit"
            className={classnames(btn["btn-group"], btn["btn-finish"])}
          >
            Confirm
          </button>
        </form>
      </div>
    </Modal>
  );
};
