// import React from 'react';
// import { Select } from '@chakra-ui/react'
// import { Input, InputGroup, InputLeftElement, InputRightAddon} from '@chakra-ui/react';
// import { Search2Icon } from "@chakra-ui/icons";
// import { Button, ButtonGroup } from '@chakra-ui/react'
// import  pp  from '../../assets/pp.jpeg';
// import React, { useState, useEffect } from "react";
// import axios from "axios";




// const MyComponent = () => {
//     const [activeMembers, setActiveMembers] = useState([]);
//     useEffect(() => {
//         const fetchActiveMembers = async () => {
//           try {
//             const response = await axios.get("http://127.0.0.1:8001/active-members");
//             console.log("Response data:", response.data);
//             setActiveMembers(response.data);
//           } catch (error) {
            
//             console.error('Error fetching active members:', error);
//           }
//         };
    
//         fetchActiveMembers();
//       }, []);

    
//   return (
//     <div className='px-20 py-5 '>
//         <h1 className="py-5 text-xl leading-tight font-bold text-gray-500">
//             Staff
//         </h1>
//         <div className='flex flex-row space-x-5 py-5'>
//             <div className='basis-1/4'>
//             <Select placeholder='Select option'>
//             <option value='option1'>Option 1</option>
//             <option value='option2'>Option 2</option>
//             <option value='option3'>Option 3</option>
//             </Select>
//             </div>

//             <div className='basis-2/4'>
//             <InputGroup>
//             <InputLeftElement children={<Search2Icon color="gray.600"/>} />
//             <Input
//                 placeholder="Search..."
//                 />
//             {/* <InputRightAddon>
//             <Button borderLeftRadius={0} borderRightRadius={3.3}>
//                 Search
//             </Button>
//             </InputRightAddon>     */}


//             </InputGroup>
//             </div>
//             <div className='basis-1/4'>
//             <Button className='w-full' colorScheme='blue'>Search</Button>
//             </div>

//         </div>
        
//     <div className="w-full overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
   
//    <div className="flow-root w">
//         <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
//             <li className="py-3 sm:py-4">
//                 <div className="flex items-center">
//                     <div className="flex-shrink-0">
//                         <img className="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
//                     </div>
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                             Neil Sims
//                         </p>
//                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                             email@windster.com
//                         </p>
//                     </div>
//                     <Button colorScheme='blue' size='xs'>
//                         Edit Role
//                     </Button>
//                 </div>
//             </li>
//             <li className="py-3 sm:py-4">
//                 <div className="flex items-center ">
//                     <div className="flex-shrink-0">
//                     <img className="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
//                     </div>
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                             Bonnie Green
//                         </p>
//                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                             email@windster.com
//                         </p>
//                     </div>
//                     <Button colorScheme='blue' size='xs'>
//                         Edit Role
//                     </Button>
//                 </div>
//             </li>
//             <li className="py-3 sm:py-4">
//                 <div className="flex items-center">
//                     <div className="flex-shrink-0">
//                     <img className="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
//                     </div>
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                             Michael Gough
//                         </p>
//                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                             email@windster.com
//                         </p>
//                     </div>
//                     <Button colorScheme='blue' size='xs'>
//                         Edit Role
//                     </Button>
//                 </div>
//             </li>
//             <li className="py-3 sm:py-4">
//                 <div className="flex items-center ">
//                     <div className="flex-shrink-0">
//                        <img className="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
//                     </div>
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                             Lana Byrd
//                         </p>
//                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                             email@windster.com
//                         </p>
//                     </div>
//                     <Button colorScheme='blue' size='xs'>
//                         Edit Role
//                     </Button>
//                 </div>
//             </li>
//             <li className="pt-3 pb-0 sm:pt-4">
//                 <div className="flex items-center ">
//                     <div className="flex-shrink-0">
//                     <img className="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
//                     </div>
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                             Thomes Lean
//                         </p>
//                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                             email@windster.com
//                         </p>
//                     </div>
//                     <Button colorScheme='blue' size='xs'>
//                         Edit Role
//                     </Button>
//                 </div>
//             </li>
//         </ul>
//    </div>
// </div>
// </div>

//   );
// };

// export default MyComponent;

/////working

import { Select } from '@chakra-ui/react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search2Icon } from "@chakra-ui/icons";
import { Button } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    useDisclosure,
    Text
} from '@chakra-ui/react';
import pp from '../../assets/pp.jpeg';
import { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";

const MyComponent = () => {
    const [activeMembers, setActiveMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const { isOpen: isRoleModalOpen, onOpen: onRoleModalOpen, onClose: onRoleModalClose } = useDisclosure();
    const { isOpen: isConfirmModalOpen, onOpen: onConfirmModalOpen, onClose: onConfirmModalClose } = useDisclosure();
    const [index, setIndex] = useState(null);
    const [error, setError] = useState(null);
    const [role, setRole] = useState("");
    const [query, setQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState("All"); // Default to 'All'
    const [roleError, setRoleError] = useState(""); // Error state for role change

    useEffect(() => {
        emailjs.init("PS5ghhKYxM1wwF0sO");
    }, []);

    const handleAddInvite = async () => {
        try {
            const memberToUpdate = activeMembers[index];

            setActiveMembers(prevMembers => {
                const updatedMembers = [...prevMembers];
                updatedMembers[index] = { ...memberToUpdate, role: role };
                return updatedMembers;
            });

            setFilteredMembers(prevMembers => {
                const updatedMembers = [...prevMembers];
                updatedMembers[index] = { ...memberToUpdate, role: role };
                return updatedMembers;
            });

            onRoleModalClose();
            onConfirmModalClose();
            setRoleError(""); // Clear any previous role errors
        } catch (error) {
            console.error('Error updating role:', error);
            setError("Error resending invite. Please try again later.");
        }
        try {
            await emailjs.send("service_pst9db1", "template_ef1od5r", {
                rolef: role,
                recipient: activeMembers[index].email
            });
            alert("Email successfully resent");
        } catch (error) {
            console.error("Error resending invite:", error);
            setError("Error resending invite. Please try again later.");
        }
    };

    useEffect(() => {
        const fetchActiveMembers = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8001/active-members");
                setActiveMembers(response.data);
                setFilteredMembers(response.data);
            } catch (error) {
                console.error('Error fetching active members:', error);
            }
        };

        fetchActiveMembers();
    }, []);

    useEffect(() => {
        const filterMembers = () => {
            const keys = ["name", "email", "role"];
            let filteredData = activeMembers;

            if (query) {
                filteredData = filteredData.filter((item) =>
                    keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
                );
            }

            if (selectedRole && selectedRole !== "All") {
                filteredData = filteredData.filter((item) => item.role === selectedRole);
            }

            setFilteredMembers(filteredData);
        };

        filterMembers();
    }, [query, selectedRole, activeMembers]);

    const onOpenRoleModal = (index) => {
        setIndex(index);
        setRole(activeMembers[index].role); // Set the initial role to the current role of the member
        onRoleModalOpen();
    };

    const handleRoleFilterChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleConfirmChange = () => {
        onConfirmModalOpen();
    };

    return (
        <div className='px-20 py-5 '>
            <Modal
                isOpen={isRoleModalOpen}
                onClose={onRoleModalClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Role</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Role</FormLabel>
                            <Select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="Select role"
                            >
                                <option value="Quality assurance">Quality assurance</option>
                                <option value="Developer">Developer</option>
                            </Select>
                            {roleError && <Text color="red.500" fontSize="sm">{roleError}</Text>}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleConfirmChange}>
                            Change
                        </Button>
                        <Button onClick={onRoleModalClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isConfirmModalOpen}
                onClose={onConfirmModalClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Role Change</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to change the role of {activeMembers[index]?.name} to {role}?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddInvite}>
                            Confirm
                        </Button>
                        <Button onClick={onConfirmModalClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <h1 className="py-5 text-xl leading-tight font-bold text-gray-500">
                Active Members
            </h1>
            <div className='flex flex-row space-x-5 py-5'>
                <div className='basis-1/4'>
                    <Select placeholder='Select option' onChange={handleRoleFilterChange}>
                        <option value='All'>All</option>
                        <option value='Quality assurance'>Quality assurance</option>
                        <option value='Developer'>Developer</option>
                    </Select>
                </div>
                <div className='basis-2/4'>
                    <InputGroup>
                        <InputLeftElement children={<Search2Icon color="gray.600" />} />
                        <Input placeholder="Search..." onChange={(e) => setQuery(e.target.value.toLowerCase())} />
                    </InputGroup>
                </div>
                <div className='basis-1/4'>
                    <Button className='w-full' colorScheme='blue'>Search</Button>
                </div>
            </div>
            <div className="w-full overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flow-root w">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredMembers.map((member, index) => (
                            <li key={index} className="py-3 sm:py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={pp} alt={member.name} />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {member.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {member.email}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white mx-4">
                                        {member.role}
                                    </p>
                                    <Button onClick={() => onOpenRoleModal(index)} colorScheme='blue' size='xs'>
                                        Change Role
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
