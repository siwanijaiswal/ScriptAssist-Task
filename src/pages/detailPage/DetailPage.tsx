// DetailPage.tsx
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Text,
  Button,
  Center,
  Image,
  Loader,
  Modal,
} from '@mantine/core';
// import { Card, Text, Loader } from '@mantine/core';
import HeightIcon from '../../assets/height.png';
import EyeIcon from '../../assets/eye.png';
import GenderIcon from '../../assets/genders.png';
import HairIcon from '../../assets/hair-dye.png';
import SkinColorIcon from '../../assets/colour.png';
import MassIcon from '../../assets/bodyweight.png';
import DetailAccordion from '../../components/detailAccordion/DetailAccordion';

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userDetail, setUserDetail] = useState<any>(null);
  const [films, setFilms] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFilm, setSelectedFilm] = useState<any>(null);
  const [filmLoading, setFilmLoading] = useState(false);
  const [showFilms, setShowFilms] = useState(false);

  const fetchUserDetail = async (id: string) => {
    try {
      const response = await fetch(`https://swapi.dev/api/people/${id}/`);
      const data = await response.json();

      setUserDetail(data);
      await fetchAdditionalData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchAdditionalData = async (data: any) => {
    const filmPromises = data.films.map((film: string) =>
      fetch(film).then((res) => res.json())
    );
    const filmsData = await Promise.all(filmPromises);
    setFilms(filmsData);
    setLoading(false);
  };

  const fetchFilmDetails = async (filmUrl: string) => {
    setFilmLoading(true);
    try {
      const response = await fetch(filmUrl);
      const filmData = await response.json();
      setSelectedFilm(filmData);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setFilmLoading(false);
    }
  };

  const handleShowFilms = () => {
    setShowFilms(!showFilms);
  };

  useEffect(() => {
    if (id) {
      fetchUserDetail(id);
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Card padding="xl" radius="lg" withBorder className="detailCard">
      {userDetail && (
        <>
          <Center>
            <Image
              src={`https://robohash.org/${id}?set=set5&size=180x180`}
              height={60}
              width={60}
            />
            <Text fw={500} size="lg" mt="md">
              {userDetail.name}
            </Text>
          </Center>

          <Center
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', gap: '85px' }}>
              <Text mt="xs" c="dimmed" size="sm" style={{ display: 'flex' }}>
                <Image
                  src={HeightIcon}
                  height={30}
                  width={30}
                  style={{ marginLeft: '5px', marginRight: '5px' }}
                  alt="Height icon"
                />
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    marginRight: '7px',
                  }}
                >
                  Height :{' '}
                </span>{' '}
                {userDetail.height}
              </Text>

              <Text
                mt="xs"
                ml="xl"
                c="dimmed"
                size="sm"
                style={{ display: 'flex' }}
              >
                <Image
                  src={GenderIcon}
                  height={30}
                  width={30}
                  style={{ marginLeft: '5px', marginRight: '5px' }}
                  alt="Height icon"
                />
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    marginRight: '7px',
                  }}
                >
                  Gender :{' '}
                </span>{' '}
                {userDetail.gender}
              </Text>
              <Text
                mt="xs"
                ml="xl"
                c="dimmed"
                size="sm"
                style={{ display: 'flex' }}
              >
                <Image
                  src={MassIcon}
                  height={30}
                  width={30}
                  style={{ marginLeft: '5px', marginRight: '5px' }}
                  alt="Height icon"
                />
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    marginRight: '7px',
                  }}
                >
                  Mass :{' '}
                </span>{' '}
                {userDetail.mass}
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '35px',
                marginTop: '1.5rem',
                marginBottom: '1rem',
              }}
            >
              <Text
                mt="xs"
                ml="xl"
                c="dimmed"
                size="sm"
                style={{ display: 'flex' }}
              >
                <Image
                  src={EyeIcon}
                  height={30}
                  width={30}
                  style={{ marginLeft: '5px', marginRight: '5px' }}
                  alt="Height icon"
                />
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    marginRight: '7px',
                  }}
                >
                  Eye Color :{' '}
                </span>{' '}
                {userDetail.eye_color}
              </Text>
              <Text
                mt="xs"
                ml="xl"
                c="dimmed"
                size="sm"
                style={{ display: 'flex' }}
              >
                <Image
                  src={HairIcon}
                  height={30}
                  width={30}
                  style={{ marginLeft: '5px', marginRight: '5px' }}
                  alt="Height icon"
                />
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    marginRight: '7px',
                  }}
                >
                  Hair Color :{' '}
                </span>{' '}
                {userDetail.hair_color}
              </Text>
              <Text
                mt="xs"
                ml="xl"
                c="dimmed"
                size="sm"
                style={{ display: 'flex' }}
              >
                <Image
                  src={SkinColorIcon}
                  height={30}
                  width={30}
                  style={{ marginLeft: '5px', marginRight: '5px' }}
                  alt="Height icon"
                />
                <span
                  style={{
                    fontWeight: 'bold',
                    color: 'black',
                    marginRight: '7px',
                  }}
                >
                  Skin Color :{' '}
                </span>{' '}
                {userDetail.skin_color}
              </Text>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: '20px',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >
              <Button
                variant="gradient"
                gradient={{ from: 'teal', to: 'cyan', deg: 90 }}
                onClick={handleShowFilms}
              >
                Films
              </Button>
              <Button
                variant="gradient"
                gradient={{ from: 'red', to: 'violet', deg: 90 }}
              >
                Home World
              </Button>
              <Button
                variant="gradient"
                gradient={{ from: 'green', to: 'indigo', deg: 90 }}
              >
                Starships
              </Button>
              <Button
                variant="gradient"
                gradient={{ from: 'gray', to: 'cyan', deg: 90 }}
              >
                Vehicles
              </Button>
            </div>

            {showFilms && ( // Conditional rendering based on showFilms state
              <div>
                <Text weight={500} mt="md">
                  Films:
                </Text>
                {films.map((film, index) => (
                  <div
                    key={index}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Text>
                      {film.title} (Release Date: {film.release_date})
                    </Text>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => fetchFilmDetails(film.url)}
                      style={{ marginLeft: '8px' }}
                    >
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Center>
          <div>
            <DetailAccordion />
          </div>
        </>
      )}

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Film Details"
      >
        {filmLoading ? (
          <Loader />
        ) : (
          selectedFilm && (
            <>
              <Text weight={500}>{selectedFilm.title}</Text>
              <Text>Director: {selectedFilm.director}</Text>
              <Text>Producer: {selectedFilm.producer}</Text>
              <Text>Release Date: {selectedFilm.release_date}</Text>
              <Text>Description: {selectedFilm.opening_crawl}</Text>
            </>
          )
        )}
      </Modal>
    </Card>
  );
};

export default DetailPage;
