import { Anchor, Group, Modal, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { StarShipCard } from './StarShip';
import { getBulkData } from '../../service/helper';

export const StarShipList = ({ starShipLinks }: any) => {
  const [starShips, setStarShips] = useState<any[]>([]);
  const [selectedstarShips, setSelectedStarShips] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAdditionalData = async () => {
    const response = await getBulkData(starShipLinks);
    setStarShips(response.map((res) => res.data));
  };

  useEffect(() => {
    fetchAdditionalData();
  }, []);

  return (
    <>
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedstarShips && <StarShipCard StarShip={selectedstarShips} />}
      </Modal>

      <Stack spacing="md">
        {starShips.length === 0 ? (
          <Text> No Data Available !!</Text>
        ) : (
          starShips.map((starShip, index) => (
            <Group key={index} position="apart" align="center">
              <Text weight={500}>{starShip.name}</Text>
              <Anchor
                onClick={() => {
                  setSelectedStarShips(starShip);
                  setModalOpen(true);
                }}
                component="span"
                color="blue"
                style={{ cursor: 'pointer' }}
              >
                See More
              </Anchor>
            </Group>
          ))
        )}
      </Stack>
    </>
  );
};
