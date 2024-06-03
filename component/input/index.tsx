"use client";

import React, { DragEvent, useEffect } from "react";
import { Box, Divider, IconButton, InputBase, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";
import useDialog from "@/hook/use-dialog";
import DialogSearchImage from "../dialog";

function Input() {
  /**
   * Provides a custom hook that manages the state and behavior of a dialog search component.
   * @returns An object containing the dialog search state and methods to control the dialog.
   */
  const useDialogSearch = useDialog();
  
  /**
   * Holds the currently selected image file, if any.
   */
  const [image, setImage] = React.useState<File | null>(null);

  /**
   * Handles the file change event for an input element.
   *
   * When a file is selected in the input element, this function updates the `image` state with the selected file, and clears the input value.
   *
   * @param event - The React change event for the input element.
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      setImage(event.target.files[0]);
      event.target.value = "";
    }
  };

  /**
   * Handles the drag over event for the input element.
   * Prevents the default behavior and calls the `onDragOver` function of the `useDialogSearch` hook if it exists.
   * @param e - The drag event object.
   */
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!useDialogSearch?.dragOver) useDialogSearch?.onDragOver();
  };

  /**
   * Handles the drag leave event for the search input.
   * @param e - The drag event object.
   */
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    useDialogSearch?.onDragLeave();
  };

  /**
   * Handles the drop event when an item is dropped onto the component.
   * @param e - The DragEvent object representing the drop event.
   */
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    var data = e.dataTransfer.files;
    if (!data) return;
    setImage(data[0]);
    useDialogSearch?.onDragLeave();
  };

  /**
   * Clears the image state when the dialog search is opened or closed.
   */
  useEffect(() => {
    setImage(null);
  }, [useDialogSearch?.open]);

  /**
   * Handles the paste event on the window and sets the first file from the clipboard data as the image.
   *
   * This effect is used to enable pasting an image directly into the component.
   */
  useEffect(() => {
    const handleKeyDown = (e: ClipboardEvent) => {
      e.preventDefault();
      var clipboardData = e.clipboardData || e.clipboardData;

      if (!clipboardData || !clipboardData?.files) return;
      setImage(clipboardData?.files[0]);
    };

    window.addEventListener("paste", handleKeyDown);

    return () => window.removeEventListener("paste", handleKeyDown);
  }, []);

  return (
    <Box>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        {/* <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={useDialogSearch?.onClickOpen}
        >
          <ImageSearchRoundedIcon />
        </IconButton>
      </Paper>

      <DialogSearchImage
        onClose={useDialogSearch?.onClose}
        open={useDialogSearch?.open}
        handleFileChange={handleFileChange}
        image={image}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        dragOver={useDialogSearch?.dragOver}
        onDragLeave={handleDragLeave}
      />
    </Box>
  );
}

export default Input;
