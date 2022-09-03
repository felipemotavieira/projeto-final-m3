import { Header } from "../Header/Header";
import { UserContext } from "../../../../context/Context";
import { useContext, useEffect } from "react";
import {
  Box,
  Heading,
  Image,
  ListItem,
  UnorderedList,
  Text,
} from "@chakra-ui/react";
import { ButtonsModal } from "../../../ButtonsModal/ButtonsModal";
import { useNavigate } from "react-router-dom";

export const DashboardMain = () => {
  const { posts, getPosts } = useContext(UserContext);

  useEffect(() => {
    getPosts();
  }, []);

 const navigate = useNavigate();

  const handleToProfile = () => {
    navigate("/profile", { replace: true });
  };

  return (
    <>
      <Header />
      <ButtonsModal titlebtn="Vai para o profile" type="1" functionOnclick={handleToProfile} />

      <UnorderedList display="flex" justifyContent="center" margin="0px">
        {posts.map((post) => (
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
        ))}
      </UnorderedList>
    </>
  );
};
