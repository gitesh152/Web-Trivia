import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, FormControl, Heading, Input, ScaleFade, Text } from "@chakra-ui/react"
import PropTypes from 'prop-types';
import { useState } from "react";
import './Question.css'

const Question = ({ index, question }) => {
  const [opts, setOpts] = useState(() => {
      return Array.from({ length: question.options.length }, () => '')
  });
  
  const [toggleShowAnswer, setToggleShowAnswer] = useState(false)
  
  const handleAnswer = () => {
    setToggleShowAnswer(prev=>!prev)
  }

  const handleOptionCheckBoxChange = (index) => {
    const newOpts=[...opts]
    newOpts[index] = !newOpts[index] ? true : ''
    setOpts(newOpts)
  }

  return (
    <>
            <ScaleFade initialScale={0.9} in={true}>
                <Box pb='2'>
          <Card
                        backgroundColor='white'
                        borderColor='blackAlpha.50'
                        borderWidth='5px'
                    >
                        <CardHeader p='4' display='flex' flexDirection={{ base: 'column', sm: 'row' }} alignItems='flex-start' gap='2' justifyContent='space-between'>
                            <Box>
                <Heading size={{base:'sm',md:'md'}} fontFamily='poppins' ps='1' display='flex' textAlign='justify'>
                  <Box>
                    {index}.
                  </Box>
                  <Box ps='2'>
                  {question.question}
                </Box>
                </Heading>
                            </Box>
                <Box>
                    <Heading  size={{base:'xs',md:'xs'}} fontFamily='poppins' ps='5' >{question.category}</Heading>
                </Box>
                        </CardHeader>
                        <Divider borderWidth='3px' borderColor='blackAlpha.50' />
                        <CardBody m='-2'>
                          {question.options.map((option,index) =>
                            {
                            return (<Box key={index} display='flex' alignItems={'center'} mt='1'
                              _hover={{cursor:'pointer', backgroundColor: toggleShowAnswer ? 'none' : 'blackAlpha.50' } }
                              backgroundColor={!toggleShowAnswer ? 'none' : option.isCorrect ? 'green.100' :  opts[index] === '' ? 'none' : 'red.100'}
                              p='1'
                              borderRadius={'5px'}
                            >
                              <FormControl display={'flex'} alignItems={'center'} >
                                <label className="checkBox__container">
                                  <Input
                                    type="checkbox"
                                    disabled={toggleShowAnswer}
                                    border={'none'}
                                    onChange={(e) => handleOptionCheckBoxChange(index, e.target.checked)}
                                    checked={toggleShowAnswer ? option.isCorrect : opts[index]}
                                  />
                                  <span className="checkmark"></span>
                                  { option.optionInfo}
                                </label>
                              </FormControl>
                            </Box>
                            )
                          })}
              {toggleShowAnswer &&
                <Box mt='1'>
                  <Text ps='1'>
                    <b>Explaination :</b> {question.description}
                  </Text>
                </Box>
              }
            </CardBody>
                        <Divider borderWidth='3px' borderColor='blackAlpha.50' />
            
                        <CardFooter p='3' ps='4' display='flex' justifyContent='flex-start' alignItems={'baseline'} flexDirection={{ base: 'column', sm: 'row' }} >
              <Button size={{ base:'xs',sm:'sm'}} colorScheme='twitter' onClick={handleAnswer}>
                {toggleShowAnswer ? 'Hide' : 'Show'} Answer
              </Button>
              
                        </CardFooter>
                    </Card>
                </Box >
            </ScaleFade >
        </>
  )
}

Question.propTypes = {
  index:PropTypes.number,
  question: PropTypes.object
}

export default Question