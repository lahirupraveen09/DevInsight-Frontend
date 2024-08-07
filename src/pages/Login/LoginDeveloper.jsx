import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Button, FormControl, Flex, Input, Stack, Text, useColorModeValue, Alert, Spinner, Box, Spacer,} from '@chakra-ui/react';
import logo from '../../assets/devsign.png';
import image from '../../assets/S.png'; 
import { BiFingerprint } from 'react-icons/bi';
import BackButton from '../../components/Profile_page/BackButton';

export default function LoginDeveloper() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFilled, setIsFilled] = useState(false);
    const [showLoggingInAlert, setShowLoggingInAlert] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsFilled(event.target.value !== '' && password !== '');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsFilled(email !== '' && event.target.value !== '');
    };

    const handleLogin = async () => {
        setShowLoggingInAlert(true);
        try {
            const response = await axios.post('http://localhost:8000/login', {
                email,
                password,
            });
            console.log(response.data);

            

            // Save token to sessionStorage
            sessionStorage.setItem('access_token', response.data.access_token);

            // Check if the profile status is 'Suspend'
            if (response.data.profileStatus === 'Suspend') {
                // Update the profile status to 'Active'
                const updatedProfile = { ...response.data, profileStatus: 'Active' };
                await axios.put('http://localhost:8000/api/update_profile_status', updatedProfile, {
                    headers: {
                        'Authorization': `Bearer ${response.data.access_token}`
                    }
                });
            }

            setLoginMessage('Login successful');
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('password', password);
            // sessionStorage.setItem('email', response.data.email, 'password', response.data.password);
            sessionStorage.setItem('llm', "gemini");
            sessionStorage.setItem('role', response.data.role);
            sessionStorage.setItem('companyEmail', response.data.companyEmail);
            
            navigate('/db');
        } catch (error) {
            setShowLoggingInAlert(false);
            if (error.response && error.response.status === 401) {
                setLoginMessage('Incorrect password. Please try again.');
            } else if (error.response && error.response.status === 404) {
                setLoginMessage('User not found. Please try again.');
            } else if (error.response.status === 403){
                navigate('/login-blocked');
            } else {
                setLoginMessage('An error occurred. Please try again later.');
            }console.error('Error logging in:', error);
        }
    };

    

    return (
        <Flex minH={'100vh'}>
        <Box>
          <BackButton />
         </Box>
            {/* Left Side */}
            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bg={useColorModeValue('white', 'gray.700')}
                
            >
                <Box mt={20}>
                    <img src={logo} height={200} width={200} alt={'DevInsightLOGO'} />
                </Box>
                <Spacer />
                <Box>
                    <img src={image} alt="Sample GIF"  height={600} width={600}/>
                </Box>
            </Box>

            {/* Right Side */}
            <Flex
                flex={1}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50')}
            >
                <Stack spacing={6} w={'full'} maxW={'md'}>
                    {showLoggingInAlert && (
                        <Alert status="info" >
                           <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='md'  mr={3}/>
                            Logging in...
                        </Alert>
                    )}
                    <Text fontSize="4xl" fontWeight="bold">
                         Hello!
                    </Text>   
                 <Text fontSize="2xl" >  Login to your account.</Text>


                    <Text> It&apos;s nice to see you again. Ready to code?</Text>
                    <FormControl id="email">
                        <Input
                            placeholder="Enter Your Email"
                            _placeholder={{ color: 'gray.900' }}
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <Input
                            placeholder="Password"
                            _placeholder={{ color: 'gray.900' }}
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </FormControl>
                    <Stack spacing={6}>
                        <Button
                            bg={isFilled ? 'blue.500' : 'blue.200'}
                            color={'white'}
                            onClick={handleLogin}
                            isDisabled={!isFilled}
                        >
                            LOGIN
                        </Button>
                    </Stack>
                    <Text color="red">{loginMessage}</Text>
                    <Text textAlign="center">
                        <Link to="/verify-email">
                            <Button variant="link" color="black">
                                Create a new account
                            </Button>
                        </Link>
                        <br />
                        <Link to="/fp">
                            <Button variant="link" as="span" color="black">
                                Forgot your password
                            </Button>
                        </Link>
                    </Text>
                </Stack>
                   {/* Biometrics Button */}
                   <Link to="/face-login">
                   <Box position="absolute" bottom="10px" right="10px">
                    <Button
                        colorScheme="teal"
                        leftIcon={<BiFingerprint />}
                        variant="solid"
                        
                    >
                        Login using Biometrics
                    </Button>
                </Box>
                </Link>
            </Flex>
        </Flex>
    );
}
