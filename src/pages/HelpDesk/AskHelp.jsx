import {useEffect, useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarUser from "../../components/dashboard/NavBarUser.jsx";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from 'axios';
import NavBarQAE from "../../components/dashboard/NavBarQAE.jsx";

function AskHelp() {
    const location = useLocation();
    const navigate = useNavigate();
    const {projectName, code, review, suggestions, referLinks, fileName ,mode,language, description} = location.state || {};
    const role = sessionStorage.getItem('role');
    const [requestSubject, setRequestSubject] = useState('');
    const [requestText, setRequestText] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const user = sessionStorage.getItem('email');
    const [projectID, setProjectID] = useState('');


    const handleSubjectChange = (event) => {
        setRequestSubject(event.target.value);
    };

    const handleRequestChange = (event) => {
        setRequestText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!requestSubject || !requestText) {
            setErrorMessage("Please fill in both the subject and the request to submit.");
            return;
        }
        setErrorMessage('');
        setShowConfirmationModal(true);
    };

    useEffect(() => {
        const fetchProjectID = async () => {
            try {
                const new_p_id = await axios.get("http://localhost:8000/get-latest-p-id", {
                    params: {
                        user: user
                    }
                });
                setProjectID(new_p_id.data);
            } catch (error) {
                console.error("Error fetching the project ID:", error);
            }
        };

        fetchProjectID().then(r => console.log(r));
    }, [user]);

    const confirmSubmission = async () => {
        try {

            const requestData = {
                user:user,
                p_id:projectID,
                p_name:projectName,
                r_id:0,
                r_subject:requestSubject,
                r_content:requestText,
                qae:"",
                r_status:"Pending"
            };

            console.log("Sending request data:", requestData); // Log payload data

            const response = await axios.post(
                "http://localhost:8000/request",
                requestData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log("Server response:", response.data); // Log server response

            setRequestSubject('');
            setRequestText('');
            setShowConfirmationModal(false);

            navigate('/cr', { state: { reviewContent:review, selectedFileName:fileName, mode:mode, suggestionContent:suggestions, referLinksContent:referLinks, projectName:projectName, language:language, description:description } });
        } catch (error) {
            console.error('Failed to save request:', error);
            if (error.response) {
                console.error('Error details:', error.response.data); // Log error details
                setErrorMessage(`Error: ${error.response.data.message}` || 'Failed to save request');
            } else {
                setErrorMessage('Failed to save request');
            }
        }
    };

    return (
        <div>
            <div>
                {role === 'Developer' ?
                    <NavBarUser button1={false} button2={true} button3={true} button4={true}/> :
                    <NavBarQAE button1={false} button2={true} button3={true} button4={true} button5={true}/>
                };
            </div>
            <div className="grid grid-cols-2 divide-x py-4  mx-4">
                <div className="bg-gray-200 rounded-lg">
                    <Tabs className="grid grid-cols-2 divide-x py-4 ml-4" variant="enclosed" colorScheme="blue" height={"1100"}>
                        <TabList>
                            <Tab>Preview</Tab>
                            <Tab>Review</Tab>
                            <Tab>Suggestions</Tab>
                            <Tab>Reference Links</Tab>
                        </TabList>
                        <TabPanels className="h-full">
                            <TabPanel className="h-full overflow-auto">

                                <pre>{code}</pre>
                            </TabPanel>
                            <TabPanel className="h-full overflow-auto">
                                <pre>{review}</pre>
                            </TabPanel>
                            <TabPanel className="h-full overflow-auto">
                                <pre>{suggestions}</pre>
                            </TabPanel>
                            <TabPanel className="h-full overflow-auto">
                                <pre>{referLinks}</pre>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
                <div className="px-4 bg-gray-200 rounded-lg mx-4 py-4">
                    <div>
                        <p>Type below the request:</p>
                        <form className="w-full" onSubmit={handleSubmit}>
                            <div className="mb-8 mt-10">
                                <input
                                    className="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight
                                        focus:outline-none focus:shadow-outline mb-3"
                                    id="subject"
                                    type="text"
                                    placeholder="Enter a subject for your request"
                                    value={requestSubject}
                                    onChange={handleSubjectChange}
                                />
                                <input
                                    className="shadow appearance-none border rounded w-full h-80 py-2 px-3 text-gray-700 leading-tight
                                        focus:outline-none focus:shadow-outline"
                                    id="request"
                                    type="text"
                                    placeholder="Enter the request"
                                    value={requestText}
                                    onChange={handleRequestChange}
                                />
                            </div>
                            {errorMessage && (
                                <div className="text-red-500 mb-4">
                                    {errorMessage}
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        {showConfirmationModal && (
                            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white rounded-lg text-2xl shadow-lg p-8 w-100">
                                    <p>Are you sure you want to submit?</p>
                                    <div className="mt-4 flex justify-end">
                                        <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={confirmSubmission}>
                                            Yes
                                        </button>
                                        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={() => setShowConfirmationModal(false)}>
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AskHelp;
