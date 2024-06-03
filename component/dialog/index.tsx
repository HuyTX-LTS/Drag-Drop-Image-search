import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, Typography } from "@mui/material";
import Image from "next/image";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  image: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop?: React.DragEventHandler<HTMLDivElement> | undefined;
  onDragOver?: React.DragEventHandler<HTMLDivElement> | undefined;
  dragOver: boolean;
  onDragLeave?: React.DragEventHandler<HTMLDivElement> | undefined;
}

export default function DialogSearchImage({
  onClose,
  open,
  handleFileChange,
  image,
  onDragOver,
  onDrop,
  dragOver,
  onDragLeave,
}: DialogProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          sx: {
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle>Tìm bằng hình ảnh qua Google Ống kính</DialogTitle>
        <DialogContent
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          sx={{
            border: `1px ${dragOver ? "dashed blue" : "solid grey"}`,
            borderRadius: "10px",
            bgcolor: dragOver ? "#F0F8FF" : "unset",
            mx: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "&.MuiDialogContent-root .MuiDialogTitle-root": {
              pt: "24px",
            },
          }}
        >
          <Input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            sx={{ display: "none", visibility: "hidden" }}
            inputProps={{
              accept: "image/*",
            }}
          />
          <DialogContentText sx={{ pt: "24px" }}>
            {image ? (
              <Image
                src={URL.createObjectURL(image)}
                alt="image"
                width={500}
                height={500}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <>
                Kéo hình ảnh vào đây hoặc{" "}
                <Typography
                  component={"label"}
                  htmlFor="fileInput"
                  sx={{ color: "blueviolet", cursor: "pointer" }}
                >
                  tải tệp lên
                </Typography>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
