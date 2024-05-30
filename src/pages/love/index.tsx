import { data } from "@/data";
import {
  a,
  animated,
  config,
  useChain,
  useSpring,
  useSpringRef,
  useTrail,
  useTransition,
} from "@react-spring/web";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./styles.module.css";

import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import React from "react";

const Trail: React.FC<{ open: boolean; children: React.ReactNode }> = ({
  open,
  children,
}) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

export default function Love() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [openText, setOpenText] = useState(1);
  const [accepted, setOpenAccepted] = useState(false);

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: "20%", background: "hotpink" },
    to: {
      size: open ? "100%" : "50%",
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

  const handleItens = () => {
    switch (step) {
      case 1:
        return {
          css: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          text: (
            <Trail open={openText === 1}>
              <Text>Texto de oi nenem</Text>
            </Trail>
          ),
        };
      case 2:
        return {
          css: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          text: (
            <Trail open={openText === 2}>
              <Text>Texto de te amo</Text>
            </Trail>
          ),
        };
      case 3:
        return {
          css: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
          text: (
            <Trail open={openText === 3}>
              <Text>Texto de todos os momentos</Text>
              <Text>com voce foram mt especiais</Text>
            </Trail>
          ),
        };
      case 4:
        return {
          css: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          text: (
            <Trail open={openText === 4}>
              <Text>Texto de quero viver </Text>
              <Text>mais momentos com vc</Text>
            </Trail>
          ),
        };
      default:
        return {
          css: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          text: (
            <>
              <Trail open={true}>
                <Text>Quer me namorar?</Text>{" "}
                <Flex align="center" gap={"4"}>
                  <animated.div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                      willChange: "transform, opacity",
                      background:
                        "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
                    }}
                    onClick={() => setOpenAccepted(true)}
                  >
                    <Text>Sim</Text>
                  </animated.div>{" "}
                  <animated.div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                      willChange: "transform, opacity",
                      background:
                        "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
                    }}
                    onClick={() => setOpenAccepted(true)}
                  >
                    <Text>Pfvr</Text>
                  </animated.div>{" "}
                </Flex>
              </Trail>
            </>
          ),
        };
    }
  };

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
          width: "100%",
          height: size,
          position: "relative",
          display: "grid",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0px 10px 10px -5px rgba(0, 0, 0, 0.05)",
          willChange: "width, height",
        }}
        onClick={() => setOpen(true)}
      >
        {open ? (
          ""
        ) : (
          <>
            <Trail open={openText === 1}>
              <Text>Para:</Text>
            </Trail>{" "}
            <Trail open={openText === 1}>
              <Text>Marina Costa Alencar</Text>
            </Trail>
            <Image
              src="https://www.icegif.com/wp-content/uploads/2021/12/icegif-702.gif"
              alt=""
            />
          </>
        )}
        {transition((style, item) => (
          <>
            {accepted ? (
              <animated.div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  willChange: "transform, opacity",
                  background:
                    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                }}
              >
                <Image
                  src={
                    "https://gifdb.com/images/high/milk-and-mocha-kissing-amor-1crt5fkzg6d0956k.gif"
                  }
                  alt=""
                />
              </animated.div>
            ) : (
              <animated.div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  willChange: "transform, opacity",
                  background: item.css,
                }}
              >
                <animated.div
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    padding: "25px",
                    borderRadius: "5px",
                    willChange: "transform, opacity",
                    background: handleItens().css,
                  }}
                >
                  {handleItens().text}{" "}
                  <Flex w="100%">
                    {step > 1 && (
                      <>
                        <IconButton
                          position={"absolute"}
                          left="10"
                          bottom="10"
                          onClick={() => {
                            setStep(step - 1);
                            setTimeout(() => {
                              setOpenText(step - 1);
                            }, 500);
                          }}
                          aria-label={""}
                        >
                          <FaArrowLeft />
                        </IconButton>
                      </>
                    )}
                    {step <= 4 && (
                      <>
                        <IconButton
                          position={"absolute"}
                          right="10"
                          bottom="10"
                          onClick={() => {
                            setStep(step + 1);
                            setTimeout(() => {
                              setOpenText(step + 1);
                            }, 500);
                          }}
                          aria-label={""}
                        >
                          <FaArrowRight />
                        </IconButton>
                      </>
                    )}
                  </Flex>
                </animated.div>
              </animated.div>
            )}
          </>
        ))}
      </animated.div>{" "}
    </Box>
  );
}
