import { SimpleGrid } from '@mantine/core';
import { LaunchCard } from '../Card/Card';
import { useLaunchContext } from '../../context/LaunchContext';
import { LaunchModal } from '../Modal/Modal';
import type { Launch } from '../../types/types';

export const LaunchList = () => {
  const { state, dispatch } = useLaunchContext();

  const handleSeeMore = (launch: Launch) => {
    dispatch({ type: 'SELECT_LAUNCH', payload: launch });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  if (state.isLoading) return <div>Загрузка...</div>;
  if (state.error) return <div>Ошибка: {state.error}</div>;

  return (
    <>
      <SimpleGrid
        cols={3}
        spacing="xs"
        verticalSpacing="xs"
      >
        {state.launches.map((launch) => (
          <LaunchCard
            key={launch.flight_number}
            launch={launch}
            onSeeMore={handleSeeMore}
          />
        ))}
      </SimpleGrid>

      {state.selectedLaunch && (
        <LaunchModal
          launch={state.selectedLaunch}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};