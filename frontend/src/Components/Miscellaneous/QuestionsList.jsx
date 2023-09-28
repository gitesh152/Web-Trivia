import { Box, Card, CardBody, CardHeader, Divider, Icon, ScaleFade, Skeleton, Spinner, VStack, useToast } from '@chakra-ui/react'
import  { useEffect, useState } from 'react'
import { ContextState } from '../../Context/Provider'
import axios from 'axios'
import Question from './Question'
import {FaClipboardQuestion} from 'react-icons/fa6'

const QuestionsList = () => {
    const [loading,setLoading]=useState(false)
    const {user,apiUrl,questions,setQuestions} =ContextState()
    const toast = useToast();
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true)
                const config = {
                    headers: {
                        'Authorization':`Bearer ${user.token}`
                    }
                }
                const { data } = await axios.get(`${apiUrl}/questions`,config);
                // console.log(data);
                setQuestions(data.questions)
                setTimeout(() => {
                setLoading(false)
                },500)                
    
            }
            catch (error) {
                toast({
                    title: error.message,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                })
                setLoading(false)
                return
            }
        }
        fetchQuestions();
    },[apiUrl, setQuestions, toast, user.token])

  return (
      <>
       <VStack display='block'>
              <Box>
                  {loading ? 
                    <ScaleFade initialScale={0.9} in={true} >
                        <Box pb='2'>
                              <Card
                                      backgroundColor='white'
                                  
                                borderColor='blackAlpha.50'
                                borderWidth='5px'
                            >
                                <CardHeader >
                                </CardHeader>
                                <Divider borderWidth='3px' borderColor='blackAlpha.50' />
                                <CardBody color='blackAlpha.700'>
                                    <Box display='flex' justifyContent='space-between' gap='7' flexDirection='column' alignItems='center'>
                                        <Skeleton>
                                            <Icon fontSize={'6xl'} as={FaClipboardQuestion} />
                                        </Skeleton>

                                        <Box >Loading Questions ... <Spinner /></Box>

                                        <Skeleton>
                                            <Box >Plese Wait ... Plese Wait ... Plese Wait ... Plese Wait ...</Box>
                                        </Skeleton>
                                    </Box>

                                </CardBody>
                            </Card>
                        </Box >
                      </ScaleFade>
                      :
                      questions?.length>0 
                          ?
                          questions.map((question,i)=><Question key={question._id} index={i+1} question={question} />)
                          :
                          <ScaleFade initialScale={0.9} in={true} >
                              <Box pb='2'>
                                  <Card
                                      backgroundColor='white'
                                    borderColor='blackAlpha.50'
                                    borderWidth='5px'
                                >
                                    <CardHeader >
                                    </CardHeader>
                                    <Divider borderWidth='3px' borderColor='blackAlpha.50' />
                                    <CardBody color='blackAlpha.700'>
                                        <Box  display='flex' justifyContent='space-between' gap='7' flexDirection='column' alignItems='center'>
                                            <Icon fontSize={'7xl'} as={FaClipboardQuestion} />
                                            <Box >No Question Found</Box>
                                            <Box >Create a new question that you can easily find later.</Box>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Box >
                        </ScaleFade>
                }
              </Box>
      </VStack>
      </>
  )
}

export default QuestionsList