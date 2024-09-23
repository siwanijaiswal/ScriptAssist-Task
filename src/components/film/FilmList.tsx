import { Anchor, Group, Modal, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { FilmCard } from './Film';
import { getBulkData } from '../../service/helper';

export const FilmList = ({ filmLinks }: any) => {
  const [films, setFilms] = useState<any[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAdditionalData = async () => {
    const response = await getBulkData(filmLinks);
    setFilms(response.map((res) => res.data));
  };

  useEffect(() => {
    fetchAdditionalData();
  }, []);

  return (
    <>
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedFilm && <FilmCard film={selectedFilm} />}
      </Modal>

      <Stack spacing="md">
        {films.length === 0 ? (
          <Text> No Data Available !!</Text>
        ) : (
          films.map((film, index) => (
            <Group key={index} position="apart" align="center">
              <Text weight={500}>{film.title}</Text>
              <Anchor
                onClick={() => {
                  setSelectedFilm(film);
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
