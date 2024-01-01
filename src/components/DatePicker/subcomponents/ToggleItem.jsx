import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { motion } from "framer-motion";

export const ToggleItem = ({ children,setting, ...props }) => {
  return (
    <motion.div {... setting} whileTap={{scale: 0.8}}>
      <ToggleGroup.Item {...props}>{children}</ToggleGroup.Item>
    </motion.div>
  );
};
