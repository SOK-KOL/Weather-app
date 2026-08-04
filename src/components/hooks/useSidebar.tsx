import { useState } from "react";

export default function useSidebar() {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return { isOpen, open, close };
}
