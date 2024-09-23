import { Anchor, Group, Modal, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { SpeciesCard } from './Species';
import { getBulkData } from '../../service/helper';

export const SpeciesList = ({ speciesLink }: any) => {
  const [species, setSpecies] = useState<any[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAdditionalData = async () => {
    const response = await getBulkData(speciesLink);
    setSpecies(response.map((res) => res.data));
  };

  useEffect(() => {
    fetchAdditionalData();
  }, []);

  return (
    <>
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedSpecies && <SpeciesCard species={selectedSpecies} />}
      </Modal>

      <Stack spacing="md">
        {species.length === 0 ? (
          <Text> No Data Available !!</Text>
        ) : (
          species.map((species, index) => (
            <Group key={index} position="apart" align="center">
              <Text weight={500}>{species.name}</Text>
              <Anchor
                onClick={() => {
                  setSelectedSpecies(species);
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
