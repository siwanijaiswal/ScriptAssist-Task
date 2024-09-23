import { Anchor, Group, Modal, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { VehicleCard } from './Vehicle';
import { getBulkData } from '../../service/helper';

export const VehicleList = ({ vehicleLinks }: any) => {
  const [vehicles, setVechicles] = useState<any[]>([]);
  const [selectedVechicle, setSelectedVechicle] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAdditionalData = async () => {
    const response = await getBulkData(vehicleLinks);
    setVechicles(response.map((res) => res.data));
  };

  useEffect(() => {
    fetchAdditionalData();
  }, []);

  return (
    <>
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedVechicle && <VehicleCard vehicle={selectedVechicle} />}
      </Modal>

      <Stack spacing="md">
        {vehicles.length === 0 ? (
          <Text> No Data Available !!</Text>
        ) : (
          vehicles.map((vehicle, index) => (
            <Group key={index} position="apart" align="center">
              <Text weight={500}>{vehicle.name}</Text>
              <Anchor
                onClick={() => {
                  setSelectedVechicle(vehicle);
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
