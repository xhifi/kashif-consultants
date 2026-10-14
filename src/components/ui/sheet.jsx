"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetTitle = Dialog.Title;
export const SheetClose = Dialog.Close;

export function SheetContent({ children, className = "", ...props }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay asChild>
        <motion.div
          className="fixed inset-0 z-[100] bg-black/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </Dialog.Overlay>
      <Dialog.Content asChild>
        <motion.div
          className={`fixed inset-0 z-[101] overflow-hidden bg-[var(--background)] outline-none ${className}`}
          initial={false}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          {...props}
        >
          {children}
        </motion.div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
