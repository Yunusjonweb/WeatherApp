import React from 'react';
import {HStack, Heading, Spinner} from 'native-base';

const Loading = () => {
  return (
    <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="lg">
        Loading
      </Heading>
    </HStack>
  );
};

export default Loading;
