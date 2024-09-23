import { Center, Loader as UIloader } from '@mantine/core';

export const Loader = () => {
  return (
    <Center
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <UIloader color="blue" size={50} />
    </Center>
  );
};
