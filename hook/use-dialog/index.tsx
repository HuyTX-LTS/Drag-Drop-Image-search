import React, { useCallback, useState } from "react";

interface DialogController {
  open: boolean;
  onClickOpen: () => void;
  onClose: () => void;
  dragOver: boolean;
  onDragOver: () => void;
  onDragLeave: () => void;
}

export default function useDialog(): DialogController {
  /**
   * Manages the open/closed state of a dialog.
   * @returns {boolean} `true` if the dialog is open, `false` otherwise.
   */
  const [open, setOpen] = useState<boolean>(false);
  
  /**
   * Tracks whether the user is currently dragging an element over the component.
   */
  const [dragOver, setDragOver] = useState<boolean>(false);

  const onClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onDragOver = useCallback(() => {
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  return {
    open,
    onClickOpen,
    onClose,
    dragOver,
    onDragOver,
    onDragLeave,
  };
}
