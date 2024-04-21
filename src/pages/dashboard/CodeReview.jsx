import {Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import CodeReviewPageHeading from "../../components/dashboard/CodeReviewPageHeading.jsx";
import { RxDividerVertical } from "react-icons/rx";
import { IoMdDownload } from "react-icons/io";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from '@chakra-ui/react'
import { useCode } from '../../context/CodeContext.jsx';
import hljs from "highlight.js";
export default function CodeReview() {
    const [reviewContent, setReviewContent] = useState('');
    const { selectedFileContent } = useCode();
    const [selectedLine, setSelectedLine] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.post("http://localhost:8000/get_code", { data: selectedFileContent });
            setReviewContent(response.data);
        } catch (error) {
            console.error("Error fetching review:", error);
        }
    };

    useEffect(() => {
        if (selectedFileContent) {
            fetchData();
        }
    }, [selectedFileContent]);

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
                <CodeReviewPageHeading/>
            </div>

            <div className="flex flex-row flex-grow">
                <div className="w-1/6 p-4 mt-3 ml-2 mr-2 bg-[#EBEBEB]">
                    Selected File List
                </div>
                <div className="w-5/6 p-4 mt-3 ml-2 mr-2 h-auto font-bold bg-[#EBEBEB] color-[#898989]">
                    <Tabs position="relative" isFitted variant="enclosed" defaultIndex={1}>
                        <TabList mb='1em'>
                            <Tab>Preview</Tab>
                            <Tab>Review</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <div className="flex flex-col">
                                    <div className="flex justify-end mb-2">
                                        <Button colorScheme="blue" border='2px' size="md" className="w-64"
                                                type={"submit"}>
                                            <BsFillQuestionSquareFill className="mr-1"/>Ask Help
                                        </Button>
                                    </div>
                                    <div>
                                        {selectedFileContent ? (
                                            <pre className="line-numbers">
                                                {addLineNumbersToCode(selectedFileContent)}
                                            </pre>
                                        ) : (
                                            <Flex alignItems="center" justifyContent="center" className="mt-20">
                                                <div><CircularProgress isIndeterminate color='blue.300'/></div>
                                            </Flex>
                                        )}
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="flex flex-col ">
                                    <div className="flex justify-end mb-2">
                                        <Button colorScheme="blue" border='2px' size="md" className="w-64"
                                                type={"submit"}>
                                            <BsFillQuestionSquareFill className="mr-1"/>Ask Help
                                        </Button>
                                        <RxDividerVertical className="mt-3"/>
                                        <Button colorScheme="blue" border='2px' size="md" className="w-64"
                                                type={"submit"}>
                                            <IoMdDownload className="mr-1"/> Download
                                        </Button>
                                    </div>
                                    <div>
                                        {reviewContent ? (
                                            <pre>{reviewContent}</pre>
                                        ) : (
                                            <Flex alignItems="center" justifyContent="center" className="mt-20">
                                                <div><CircularProgress isIndeterminate color='blue.300'/></div>
                                            </Flex>
                                        )}
                                    </div>
                                </div>
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