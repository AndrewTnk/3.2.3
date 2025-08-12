import { Container, Title } from '@mantine/core';
import { LaunchList } from './components/List/List';
import { LaunchProvider } from './context/LaunchContext';
import { useLaunch } from './hooks/useLaunch';

function App() {
  return (
    <LaunchProvider>
      <Container py='xl'>
        <Title order={1} mb='xl' >
          SpaceX Launches 2020
        </Title>
        <LaunchContent />
      </Container>
    </LaunchProvider>
  )
}

const LaunchContent = () => {
  useLaunch();
  return <LaunchList />;
};

export default App
