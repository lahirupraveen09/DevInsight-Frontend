import { useState, useEffect } from 'react';
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs.css';
import {Tabs, TabList, TabPanels, Tab, TabPanel, Button, CircularProgress, Flex, Input, Text, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader} from '@chakra-ui/react';
import FileList from "../../components/dashboard/FileList.jsx";
import CodePreviewPageHeading from "../../components/dashboard/CodePreviewPageHeading.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { GoCodeReview } from "react-icons/go";
import { useCode } from '../../context/CodeContext.jsx';
import LanguageSelectMenu from "../../components/dashboard/LanguageSelectMenu.jsx";
import {IoHelpCircle} from "react-icons/io5";

export default function CodePreview() {
    const { selectedFileContent, setSelectedFileContent } = useCode();
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedLine, setSelectedLine] = useState(null);
    const [reviewContent, setReviewContent] = useState('');
    const [suggestionContent, setSuggestionContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    let { code, mode, language, description } = state || {};
    const mode_value = mode;
    if (language === ""){
        language = "Not given";
    }
    if (description === ""){
        description = "Not given";
    }

    const [Language, setLanguage] = useState(language);
    const description_value = description;

    const handleLanguageChange = (language) => {
        setLanguage(language);
    };

    const [prName, setPrName] = useState('')
    const handlePrNameChange = (event) => setPrName(event.target.value)

    useEffect(() => {
        if (mode === 1 && code !== '') {
            setSelectedFileContent(code);
        }
    }, [code, mode, setSelectedFileContent]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/files/${selectedFileName}`);
                setSelectedFileContent(response.data);
            } catch (error) {
                console.error("Error fetching file content:", error);
            }
        };

        if (selectedFileName !== '') {
            fetchData().then(r => console.log(r) );
        }
    }, [mode, selectedFileName, setSelectedFileContent]);

    useEffect(() => {
        if (selectedFileContent) {
            hljs.highlightAll();
        }
    }, [selectedFileContent]);

    useEffect(() => {
        if (reviewContent !== '' && suggestionContent !== '') {
            navigate('/cr', { state: { reviewContent: reviewContent, selectedFileName: selectedFileName , suggestionContent:suggestionContent} });
        }
        console.log(reviewContent);
    }, [reviewContent, navigate, selectedFileName, mode, suggestionContent]);

    useEffect(() => {
        if (prName !== '' && selectedFileContent) {
            setSubmitEnabled(true);
        } else {
            setSubmitEnabled(false);
        }
    }, [prName,selectedFileContent]);



    const handleSubmit = async () => {
        setIsModalOpen(true); // Open the modal
        console.log("Selected file name in CodePreview:", selectedFileName);
        const fetchData = async () => {
            try {
                if (!selectedFileContent) {
                    console.error("Selected file content is empty.");
                }
                const response1 = await axios.post("http://localhost:8000/get_review", { p_id:"1" , p_name:prName, f_name:selectedFileName, language:Language , description:description_value , code: selectedFileContent , mode:mode_value });
                setReviewContent(response1.data);
                const response2 = await axios.post("http://localhost:8000/get_suggestions", { code: selectedFileContent , review: reviewContent });
                setSuggestionContent(response2.data);
            } catch (error) {
                console.error("Error fetching review:", error);
            } finally {
                setIsModalOpen(false); // Close the modal
            }
        };
        fetchData(description, language).then(r =>
            console.log(r)
        ); // Call fetchData with description and language
    };


    function addLineNumbersToCode(code) {
        const lines = code.split('\n');
        const numberedCode = lines.map((line, index) => {
            const isSelected = selectedLine === index;
            const lineClass = isSelected ? 'bg-blue-100' : '';

            return (
                <div
                    key={index}
                    className={`flex ${lineClass}`}
                    onClick={() => setSelectedLine(index)}
                >
                    <div className="w-6 text-left text-gray-500 pr-20 user-select-none">
                        {index + 1}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(line).value }} />
                </div>
            );
        });

        return (
            <pre className="line-numbers">
                {numberedCode}
            </pre>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <div>
                <CodePreviewPageHeading/>
            </div>

            <div className="flex flex-row flex-grow">
                <div className="w-1/6 p-4 mt-3 ml-2 mr-2 bg-[#EBEBEB] flex flex-col">
                    <div>
                        <Text className="text-xl font-bold mr-2">Language</Text>
                        <LanguageSelectMenu onLanguageChange={handleLanguageChange} selectedLanguage={language}/>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <Text className="text-xl font-bold mr-2">Project Name</Text>
                            <Text color="red.400" className="text-xl">*</Text>
                        </div>

                        <Input
                            value={prName}
                            onChange={handlePrNameChange}
                            focusBorderColor='blue.400'
                            placeholder='Enter a name for Project / Submission'
                            variant='filled'
                            className="mb-4"
                        /></div>

                    <div>
                        <FileList onSelectFile={(fileName) => setSelectedFileName(fileName)} selectedFileName='' mode={mode}/>
                        <div className="flex items-center">
                            <IoHelpCircle className="mr-2 size-7 colur" />
                            <Text className="font-bold mr-2 text-red-400">Please select a file to initiate the review process</Text>
                            <Text color="red.400" className="text-xl">*</Text>
                        </div>
                    </div>


                </div>
                <div className="w-5/6 p-4 mt-3 ml-2 mr-2 h-auto font-bold bg-[#EBEBEB] color-[#898989]">
                    <Tabs position="relative" isFitted variant="enclosed">
                    <TabList mb='1em'>
                            <Tab>Preview</Tab>
                            <Tab isDisabled>Review</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel className="flex flex-col">
                                <div className="flex justify-end mb-2">
                                    <Button colorScheme="blue" border='2px' size="lg" className="w-64"
                                            onClick={handleSubmit} type={"submit"} isDisabled={!submitEnabled}>
                                        <GoCodeReview className="mr-2"/>Review
                                    </Button>
                                </div>
                                {selectedFileContent ? (
                                    <pre>
                                        {addLineNumbersToCode(selectedFileContent)}
                                    </pre>
                                ) : (
                                    <div>No file or code selected</div>
                                )}

                                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Loading ...</ModalHeader>
                                        <ModalBody>
                                            <Flex alignItems="center" justifyContent="center">
                                                <CircularProgress isIndeterminate color='blue.300' />
                                            </Flex>
                                            <Flex alignItems="center" justifyContent="center">
                                                <Text>Please Wait ...</Text>
                                                <Text>It will take some time to generate the review</Text>
                                            </Flex>
                                        </ModalBody>
                                    </ModalContent>
                                </Modal>

                            </TabPanel>
                            <TabPanel>
                                hello
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
            <style>
                {`
                    .user-select-none {
                        user-select: none;
                    }
                `}
            </style>
        </div>
    );
}
