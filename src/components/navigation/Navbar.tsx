import { Avatar, Box, Icon, Text, useColorMode } from "@chakra-ui/react";
import { CiSun, CiDark } from "react-icons/ci";
import { PiGithubLogo, PiTwitterLogo, PiYoutubeLogo } from "react-icons/pi";
import Navicon from "./Navicon";
import { Link } from "react-router-dom";
import User from "../../models/User";
import { useState } from "react";
import { channel } from "../../models/Client";

export default function Navbar(props: {user: User | null}) {

  const { colorMode, toggleColorMode } = useColorMode();
  const [ image, setImage ] = useState(props.user?.getData().image);

  const handleImageChange = (payload: { [x: string]: unknown; type?: "broadcast"; event?: string; payload?: {image: string}; }) => {
    setImage(payload.payload?.image);
  }

  channel.on('broadcast', { event: 'image'}, (payload) => handleImageChange(payload));


  return (
    <Box w='100vw' h='1vh' display='flex' alignItems='center' justifyContent='space-between' padding={12} boxShadow={'0px 3px 3px rgba(0,0,0,0.1)'}>
      <Link to='/'><Text fontSize={24} fontWeight={500}>Branch</Text></Link>
      <Box display='flex' w='14vw' justifyContent='space-around'>
        <Icon cursor={"pointer"} as={colorMode === 'light' ? CiDark : CiSun} onClick={toggleColorMode} w={6} h={6} />
        <Navicon icon={PiGithubLogo} />
        <Navicon icon={PiTwitterLogo} />
        <Navicon icon={PiYoutubeLogo} />
      </Box>

      <Link to={props.user ? '/account' : '/login'}><Avatar size='sm' src={image} bgColor='red.300' /></Link>
    </Box>
  )
}