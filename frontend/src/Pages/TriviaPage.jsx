import { Box } from '@chakra-ui/react'
import Header from '../Components/Miscellaneous/Header'
import QuestionsList from '../Components/Miscellaneous/QuestionsList'

const TriviaPage = () => {

  return (
    <div style={{ width: "100%", overflowY:'auto', paddingBottom:'100px' }} >
      <Header />
      <Box position='relative'
        top='66px'
        w={{ base: '100%', xl: '6xl' }} m='0px auto' px='1'>
        <QuestionsList/>
        </Box>
    </div>
  )
}

export default TriviaPage