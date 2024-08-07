import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button, Alert, AlertIcon, FormControl, Center, FormLabel, Checkbox, Text, Progress, Box, VStack, HStack, Image, Divider, Heading } from '@chakra-ui/react';
import Devinsight from '../../assets/Devinsight.png';
import axios from 'axios';
import OrgReg from '../../assets/orgreg.svg';

function InteractiveForm() {
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const handleClick = () => setShow(!show);
    const handleConfirmClick = () => setShowConfirm(!showConfirm);

    const [formData, setFormData] = useState({
        company_name: '',
        admin_email: '',
        company_address: '',
        phone_number: '',
        has_custom_domain: false,
        domain: '',
        password: '',
        confirmPassword: '',
        logo_url: '', // Keeping this field to send as empty to the backend
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (name === 'has_custom_domain' && !checked) {
            // Clear domain if 'has_custom_domain' is unchecked
            setFormData(prevState => ({
                ...prevState,
                domain: ''
            }));
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }
    };

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/check-company-email', { params: { email } });
            return response.data.exists;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Step 1 validations
        if (!formData.company_name) newErrors.company_name = 'Company name is required';
        if (!formData.admin_email) newErrors.admin_email = 'Admin email is required';
        if (!formData.company_address) newErrors.company_address = 'Company address is required';
        if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';

        if (formData.has_custom_domain) {
            if (!formData.domain) {
                newErrors.domain = 'Custom domain is required';
            } else {
                const emailDomain = formData.admin_email.split('@')[1];
                if (emailDomain !== formData.domain) {
                    newErrors.domain = 'Admin email domain does not match the custom domain';
                }
            }
        }

        // Step 2 validations
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }
        // If all validations are OK, check the email availability
        if (formData.admin_email) {
            const emailExists = await checkEmailExists(formData.admin_email);
            if (emailExists) {
                setErrors({ admin_email: 'Admin email already exists' });
                setIsLoading(false);
                return;
            }
        }
        try {
            const { confirmPassword, ...dataToSubmit } = formData;
            const response = await axios.post('http://127.0.0.1:8000/create-company', dataToSubmit);
            setSuccessMessage('Registration successful! Please check your email for verification.');
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Registration failed! Please try again.');
            setSuccessMessage('');
        } finally {
            setIsLoading(false);
        }
    };

    const calculatePasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
        return score;
    };

    return (
        <Box flex="1" display="flex" flexDirection="column" bg="white" maxH="100vh" >
        <HStack flex="1"  className="h-full " alignItems="center" justifyContent="center" >
            
    
        <Box w="50%" p={8} bg="white" rounded="lg" className="flex flex-col justify-center items-center">
            <VStack spacing={8} align="center" w="50%" h="full">

                <Box paddingBottom={52}>
                    <Image src={Devinsight} alt="DevInsight" maxW="200px" maxH="200px" />
                </Box>
                
                <Image src={OrgReg} alt="regorgimage" maxW="200px" maxH="200px" />
                
                <Text fontSize="md" color="gray.600" textAlign="center" mt={-4}>
                Welcome to DevInsight! Our platform streamlines code reviews within your organization. Register your organization to empower Quality Assurance and developer teams for effective collaboration.
                </Text>
                
                <Text fontSize="sm" color="gray.600" textAlign="center" fontWeight="bold">
                    In DevInsight, organizations with dedicated email domains enable Quality Assurance and developers to sign up seamlessly. Simply select your organization's name and enter your email address using the dedicated domain. Our verification process ensures swift registration, making it effortless to join and collaborate within your organization.
                </Text>
                
            </VStack>
        </Box>
        <Center height='90vh'>
        <Divider orientation='vertical' />
        </Center>
            <Box w="50%" p={12} bg="white" rounded="lg" className="flex justify-center items-center" overflowY="auto" h="100vh">
                <VStack spacing={6} align="stretch" w="75%" py={4}>
                    
                    <Heading as="h2" size="lg">
                        Organization Registration
                    </Heading>
                    <form onSubmit={handleSubmit} className="w-full">
                        <VStack spacing={6} align="stretch">
                            <FormControl>
                                <FormLabel htmlFor="company_name">Organization Name (Required)</FormLabel>
                                <Input
                                    id="company_name"
                                    type="text"
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                />
                                {errors.company_name && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        {errors.company_name}
                                    </Alert>
                                )}
                            </FormControl>
    
                            <FormControl>
                                <Checkbox
                                    id="has_custom_domain"
                                    name="has_custom_domain"
                                    isChecked={formData.has_custom_domain}
                                    onChange={handleChange}
                                >
                                    Do you have a custom domain?
                                </Checkbox>
                                <Text fontSize="sm" color="gray.500">
                                    With the custom domain helps to verify users company when sign in, Otherwise
                                    admin need to accept sign in requests.
                                </Text>
                            </FormControl>
    
                            {formData.has_custom_domain && (
                                <FormControl>
                                    <FormLabel htmlFor="domain">Custom Domain</FormLabel>
                                    <Input
                                        id="domain"
                                        name="domain"
                                        type="text"
                                        value={formData.domain}
                                        onChange={handleChange}
                                    />
                                    {errors.domain && (
                                        <Alert status="error">
                                            <AlertIcon />
                                            {errors.domain}
                                        </Alert>
                                    )}
                                </FormControl>
                            )}
    
                            <FormControl>
                                <FormLabel htmlFor="admin_email">Organization Email (Required)</FormLabel>
                                <Input
                                    id="admin_email"
                                    name="admin_email"
                                    type="email"
                                    value={formData.admin_email}
                                    onChange={handleChange}
                                />
                                {errors.admin_email && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        {errors.admin_email}
                                    </Alert>
                                )}
                            </FormControl>
    
                            <FormControl>
                                <FormLabel htmlFor="company_address">Organization Address (Required)</FormLabel>
                                <Input
                                    id="company_address"
                                    name="company_address"
                                    type="text"
                                    value={formData.company_address}
                                    onChange={handleChange}
                                />
                                {errors.company_address && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        {errors.company_address}
                                    </Alert>
                                )}
                            </FormControl>
    
                            <FormControl>
                                <FormLabel htmlFor="phone_number">Phone Number (Required)</FormLabel>
                                <Input
                                    id="phone_number"
                                    name="phone_number"
                                    type="text"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                />
                                {errors.phone_number && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        {errors.phone_number}
                                    </Alert>
                                )}
                            </FormControl>
    
                            <FormControl>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        id="password"
                                        type={show ? 'text' : 'password'}
                                        placeholder="Enter password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.password && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        {errors.password}
                                    </Alert>
                                )}
                                <Progress
                                    value={passwordStrength * 20}
                                    size="xs"
                                    colorScheme={passwordStrength >= 4 ? 'green' : passwordStrength >= 2 ? 'yellow' : 'red'}
                                    mt={2}
                                />
                                <Text fontSize="sm" color="gray.500">
                                    {passwordStrength < 2 ? 'Weak' : passwordStrength < 4 ? 'Medium' : 'Strong'}
                                </Text>
                            </FormControl>
    
                            <FormControl>
                                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirm ? 'text' : 'password'}
                                        placeholder="Confirm password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleConfirmClick}>
                                            {showConfirm ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.confirmPassword && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        {errors.confirmPassword}
                                    </Alert>
                                )}
                            </FormControl>
    
                            <Button type="submit" colorScheme="blue" isLoading={isLoading} loadingText="Register">
                                Register
                            </Button>
    
                            {successMessage && (
                                <Alert status="success">
                                    <AlertIcon />
                                    {successMessage}
                                </Alert>
                            )}
                            {errorMessage && (
                                <Alert status="error">
                                    <AlertIcon />
                                    {errorMessage}
                                </Alert>
                            )}
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </HStack>
        </Box>
    );
    
}

export default InteractiveForm;
