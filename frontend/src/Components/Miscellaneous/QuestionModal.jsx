import  {  useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    Input,
    Textarea,
    useToast,
    Box,
    VStack,
    Checkbox,
    Text,
    Spinner,
} from '@chakra-ui/react'
import { ContextState } from '../../Context/Provider'
import axios from 'axios';
import PropTypes from 'prop-types'

const QuestionModal = ({ children, currentQues }) => {
    const [category, setCategory] = useState('')
    const [question, setQuestion] = useState('')
    const [description, setDescription] = useState('')
    const [options, setOptions] = useState(['','']);
    const [optionsCheckBox, setOptionsCheckBox] = useState([false,false]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const { apiUrl, user,setQuestions,questions } = ContextState();
    const toast = useToast();

    const handleCatChange = (e) => {
    setCategory(e.target.value)
    }
     const handleQuesChange = (e) => {
        setQuestion(e.target.value)
    }
    const handleDescChange = (e) => {
        setDescription(e.target.value)
    }
    const handleAddOptions = () => {
        setOptions([...options, ''])
        setOptionsCheckBox([...optionsCheckBox,false]);
    }
    const handleOptionTextFieldChange = (index, value) => {
        const updatedOptions = [...options]
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    }

    const handleSubmit = async () => {
        console.log(options.length)

        //Checking if all option field has values
        if (!options.every((op)=>op!=='') ) {
            toast({
                title: `Please fill all options fields`,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return;
        }
        
        //Checking if no checkbox is ticked
        if (optionsCheckBox.every((check) => check === false)) {
            toast({
                title: `Please tick answer checkbox(s)`,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return;
        }

        //Checking if every checkbox is ticked
        if (optionsCheckBox.every((check) => check === true)) {
            toast({
                title: `All checkboxs are ticked, Please tick only answer checkbox(s)`,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return;
        }

        //Checking if category && question && description is not filled
        if (!category || !question  || !description ) {
            toast({
                title: `Please fill all the fields`,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            return;
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                }
            }
            const {data} = await axios.post(`${apiUrl}/questions`,
                {
                    question,
                    category:category.toString().toUpperCase(),
                    options,
                    optionsCheckBox,
                    description
                }, config);
            console.log(data.question)
            setQuestions([data.question,...questions])
            // setQuestion('')
            // setDescription('');
            // setOptions([''])
            setLoading(false)
            onClose();
            toast({
                title: `Question created successfully !`,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
            console.log(error)
            toast({
                title: `Error creating question`,
                // description: `${error.response.data.error}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }

    const handleUpdate = () => {
    
}

    const handleOptionCheckBoxChange = (index,checked) => {
        const updatedOptionsCheckBox = [...optionsCheckBox]
        updatedOptionsCheckBox[index] = checked
        setOptionsCheckBox(updatedOptionsCheckBox)
    }

    // console.log(optionsCheckBox)
    const customStyle = {
    _hover:{border:'1px solid blue'},
          color:'blue.700',
          border:'1px solid',
          borderColor:'blue.700'
  }
    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay bg='blackAlpha.300' 
                    backdropFilter='blur(10px)'  />
                <ModalContent pos="fixed" zIndex={2} >
                    <ModalHeader fontSize='25px' textAlign='center' fontFamily='poppins'>{currentQues ? 'Update' : 'Create'} Question</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                    <VStack display='block'>
                            <Box>
                                <FormControl isRequired={'true'}>
                            <Input type='text' required fontSize='sm' {...customStyle} placeholder="Enter Category of Question ..." value={category} onChange={handleCatChange} />
                                </FormControl>
                        <FormControl>
                                    <Textarea
                                        mt='1'
                        borderRadius='5px'
                        fontSize='md'
                        value={question}
                        onChange={handleQuesChange}
                        placeholder='Type Question Here ...'
                            size='sm'
                            {...customStyle}
                        />
                        </FormControl>
                        <FormControl  >
                        {options.map((value,index) =>
                            {
                            return (<Box key={index} display='flex' alignItems={'center'} mt='1'>
                                    <Text fontSize='2xl' pe='2' color='red.700'>{index + 1}</Text>
                                <Checkbox size='lg' defaultChecked={optionsCheckBox[index]} pe='1' onChange={(e) => handleOptionCheckBoxChange(index, e.target.checked)} borderColor={'blue.700'} colorScheme='blue' w='100'  >
                                </Checkbox>                
                                <Input type='text' required fontSize='sm' {...customStyle} placeholder="Enter Option Value ..." value={value} onChange={(e) => handleOptionTextFieldChange(index, e.target.value)} />
                            </Box>
                        )})}
                        <Button mt='1' ms='lg' colorScheme="facebook" onClick={handleAddOptions}>Add Option</Button>
                        {/* </Box> */}
                        </FormControl>
                        <FormControl pt='1'>
                        <Textarea
                        borderRadius='5px'
                        _hover={{border:'1px solid blue'}}
                        fontSize='md'
                        color='blue.700'
                        border='1px solid'
                        borderColor='blue.700'
                        value={description}
                        onChange={handleDescChange}
                        placeholder='Type Answer Description Here ...'
                        size='sm'
                        />
                        </FormControl>
                    </Box>
                    </VStack>
                    </ModalBody>
                    <ModalFooter pt='0' display='flex' justifyContent='space-between'>
                        <Button colorScheme='blue'
                            onClick={() => currentQues ? handleUpdate(currentQues._id) : handleSubmit()}
                        >
                            Submit
                        </Button>
                        {loading && <Box textAlign='center'><Spinner color='blue.500' size='xl' /></Box>}
                        <Button onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

QuestionModal.propTypes = {
    children: PropTypes.node.isRequired,
    currentQues: PropTypes.object,
}

export default QuestionModal
