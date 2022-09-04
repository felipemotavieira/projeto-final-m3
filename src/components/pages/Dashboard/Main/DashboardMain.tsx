import { Header } from "../Header/Header";
import { UserContext } from "../../../../context/Context";
import React, { useContext, useEffect } from "react";
import {
  Box,
  Heading,
  Image,
  ListItem,
  UnorderedList,
  Text,
} from "@chakra-ui/react";

export const DashboardMain = () => {
  const { posts, getPosts } = useContext(UserContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Header />

      <UnorderedList
        gap={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="0px"
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <ListItem
              borderRadius="20px"
              listStyleType="none"
              backgroundColor="#fff"
              w={["100%", "85%", "75%", "60%"]}
              h="max-content"
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <Box
                display="flex"
                alignItems="center"
                gap={10}
                flexDirection="row"
                w="95%"
              >
                <Image
                  borderRadius="20px 0 0px 20px"
                  w={[0, 0, "50%"]}
                  h={[0, 0, "350px"]}
                  src={post.postImage}
                ></Image>

                <Box display="flex" flexDirection="column" gap={3}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap={5}
                  >
                    <Image
                      w="15%"
                      h="100%"
                      borderRadius="100%"
                      src={"imagem user"}
                    ></Image>
                    <Box>
                      <Heading as="h1" fontSize="20px">
                        {"nome"}
                      </Heading>
                      <Heading as="h3" fontSize={["20px", "20px", "0"]}>
                        {"cidade"}-{"estado"}
                      </Heading>
                    </Box>
                  </Box>

                  <Image
                    borderRadius="20px"
                    w={["100%", "100%", 0]}
                    h={["100%", "100%", 0]}
                    src={post.postImage}
                  ></Image>

                  <Heading as="h2" size="sm">
                    {post.title}
                  </Heading>
                  <Text>{post.description}</Text>
                  <Heading as="h3" fontSize={[0, 0, "20px"]}>
                    {"cidade"}-{"estado"}
                  </Heading>
                </Box>
              </Box>
            </ListItem>
          ))
        ) : (
          <Box w="50vw" h="80vh" mb="auto">
            <Image src="./Atenção.png"></Image>
          </Box>
        )}
      </UnorderedList>
    </Box>
  );
};
