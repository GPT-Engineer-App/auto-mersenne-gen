import React, { useState, useEffect } from "react";
import { Box, Container, Heading, Button, Text, VStack, HStack, useToast } from "@chakra-ui/react";
import { FaCalculator } from "react-icons/fa";

// Helper function to check if a number is a Mersenne prime
const isMersennePrime = (n) => {
  if (n < 2) return false;
  let p = 2;
  for (let i = 1; i < n; ++i) {
    p *= 2;
  }
  p -= 1;
  for (let i = 2; i * i <= p; ++i) {
    if (p % i === 0) {
      return false;
    }
  }
  return true;
};

const Index = () => {
  const [mersennePrimes, setMersennePrimes] = useState([]);
  const [count, setCount] = useState(2); // Starting from the first non-trivial Mersenne prime exponent (2^2-1)
  const toast = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      if (isMersennePrime(count)) {
        setMersennePrimes((prevPrimes) => [...prevPrimes, 2 ** count - 1]);
        toast({
          title: "New Mersenne Prime Found!",
          description: `2^${count} - 1 is a Mersenne Prime`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
      setCount((c) => c + 1);
    }, 5000); // Check for a new Mersenne prime every 5 seconds

    return () => clearInterval(interval);
  }, [toast, count]);

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Mersenne Prime Generator
        </Heading>
        <Text textAlign="center">Discovering new Mersenne primes. Please standby as the algorithm searches for primes...</Text>
        <Box align="center">
          <Button leftIcon={<FaCalculator />} colorScheme="teal" variant="solid">
            Calculate Mersenne Primes
          </Button>
        </Box>
        <Heading as="h3" size="lg" textAlign="center">
          Found Mersenne Primes
        </Heading>
        <VStack>
          {mersennePrimes.length > 0 ? (
            mersennePrimes.map((prime, index) => (
              <HStack key={index} justify="center">
                <Text fontSize="xl">{prime}</Text>
              </HStack>
            ))
          ) : (
            <Text textAlign="center">No Mersenne primes found yet...</Text>
          )}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
