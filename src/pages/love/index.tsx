import { data } from "@/data";
import {
  animated,
  config,
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
} from "@react-spring/web";
import { useState } from "react";

import { Box } from "@chakra-ui/react";

export default function Love() {
  const [open, set] = useState(false);

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: "20%", background: "hotpink" },
    to: {
      size: open ? "100%" : "20%",
      background: open ? "white" : "hotpink",
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ]);

  return (
    <Box
      width="100%"
      height="100vh"
      background="lightblue"
      padding="20px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <animated.div
        style={{
          ...rest,
          width: size,
          height: size,
          position: "relative",
          display: "grid",
          "grid-template-columns": "repeat(4, minmax(100px, 1fr))",
          "grid-gap": "25px",
          padding: "25px",
          background: "white",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0px 10px 10px -5px rgba(0, 0, 0, 0.05)",
          "will-change": "width, height",
        }}
        onClick={() => set((open) => !open)}
      >
        {transition((style, item) => (
          <animated.div
            style={{
              width: "100%",
              height: "100%",
              background: "#FF69B4",
              borderRadius: "5px",
              "will-change": "transform, opacity",
            }}
            style={{ ...style, background: item.css }}
          />
        ))}
      </animated.div>{" "}
    </Box>
  );
}
