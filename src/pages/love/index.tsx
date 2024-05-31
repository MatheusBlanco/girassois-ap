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
import Head from "next/head";
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
      {trail.map(({ height, ...style }, index) => {
        return (
          <a.div key={index} className={styles.trailsText} style={style}>
            <a.div style={{}}>{items[index]}</a.div>
          </a.div>
        );
      })}
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
              <Text>Oi Marina</Text>
              <Text>Criei esse site de Girassóis</Text>
              <Text>pra você achar que não era nada sério</Text>{" "}
              <Text>KKKKKKKKKKKK</Text>{" "}
              <Image
                src={
                  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcAr7sJK1xlU9OZGBFFUsdQ7_OxUSoJhWs1m-s8WGHmLr3htAoqe5DQQk8s1vOxppfZSmBbQqnfnU2T5onC60cJjPr1GTAEB3ykSpO8VtmjU8FOe_3c2XzGI7pRYJgx8-4C2YVXEu_xpO8/s1600/pegadinha.jpg"
                }
                alt=""
              />
            </Trail>
          ),
        };
      case 2:
        return {
          css: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          text: (
            <Trail open={openText === 2}>
              <Text>Mas falando sério agora</Text>{" "}
              <Text>Queria fazer algo especial para demonstrar que te amo</Text>{" "}
              <Text>
                Aí fiz este site. Ficou simples, mas foi feito com amor
              </Text>
            </Trail>
          ),
        };
      case 3:
        return {
          css: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
          text: (
            <Trail open={openText === 3}>
              <Text>Porque você se tornou alguém muito especial para mim</Text>
              <Text>
                Eu sei que não sou bom em demonstrar meus sentimentos, mas de
                pouco em pouco você tem me tirado cada vez mais da minha
                caixinha e me expondo pro mundo
              </Text>
              <Text>E por isso eu sou muito grato</Text>
            </Trail>
          ),
        };
      case 4:
        return {
          css: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          text: (
            <Trail open={openText === 4}>
              <Text>
                Eu amo como você é capaz de demonstrar seu afeto, todo o carinho
                que você tem e demonstra, suas esquisitices e jeitinhos, que eu
                acho extremamente charmosos e fofos
              </Text>
              <Text>
                Todos os momentos com você foram mais do que especiais, e tenho
                certeza que os futuros serão tão especiais quanto, ou mais
              </Text>
            </Trail>
          ),
        };
      default:
        return {
          css: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          text: (
            <>
              <Trail open={true}>
                <Text>Mas não quero mais ser seu ficante</Text>{" "}
                <Text>Quer namorar comigo?</Text>{" "}
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
    <>
      <Head>
        <title>Girassóis</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  );
}
