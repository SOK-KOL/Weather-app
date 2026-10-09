import { useState } from "react";

export default function useOpen() {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return { isOpen, open, close };
}
