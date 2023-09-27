
import { Avatar, Box, Button, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react'
import {AddIcon, ChevronDownIcon} from '@chakra-ui/icons'
import ProfileModal from './ProfileModal'
import { ContextState } from '../../Context/Provider'
import { useNavigate } from 'react-router-dom'
import QuestionModal from './QuestionModal'

const Header = () => {
    const { user } = ContextState();
    const Navigate=useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        Navigate('/')
    }
    return (
        <Box

            background='white'
            width='100%'
            display='flex'
            justifyContent='center'
            borderColor='blackAlpha.50'
            borderWidth='5px'
            zIndex='2'
            position={'fixed'}
        >
            <Box
                w={{base:'100%',xl:'6xl'}} m='0px auto' p='1'
                        display='flex'
            alignItems='center'
            justifyContent='space-between'
        >
            <QuestionModal >
                <Button
                    display={{ base: 'none', sm: 'flex' }}
                    rightIcon={<AddIcon />}
                >Add a question</Button>
                <IconButton display={{ sm: 'none' }} icon={<AddIcon />} />
            </QuestionModal>
             <Text fontFamily='poppins' fontSize={{ md: '2xl' }}>
                Web - Trivia
            </Text>
            <Box 
                display='flex'
                alignItems='center'
            >
                <Menu >
                    <MenuButton  as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar size='sm' cursor='pointer' src={user.pic} name={user.name} />
                    </MenuButton>
                    <MenuList border='none' >
                        <ProfileModal user={user} >
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider />
                        <MenuItem onClick={handleLogout} >Logout</MenuItem>
                    </MenuList>
                </Menu>
                </Box>
            </Box>
      </Box>
  )
}

export default Header