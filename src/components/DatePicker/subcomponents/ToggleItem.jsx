import React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { motion } from "framer-motion";

export const ToggleItem = ({ children,setting, ...props }) => {
  return (
    <motion.div {... setting}>
      <ToggleGroup.Item {...props}>{children}</ToggleGroup.Item>
    </motion.div>
  );
};
