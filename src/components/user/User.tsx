import { Card, Text, Button, Center, Image } from '@mantine/core';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import HeightIcon from '../../assets/height.png';
import EyeIcon from '../../assets/eye.png';
import GenderIcon from '../../assets/genders.png';
import HairIcon from '../../assets/hair-dye.png';
import SkinColorIcon from '../../assets/colour.png';
import MassIcon from '../../assets/bodyweight.png';

const UserCard: FC<{
  user: Record<string, any>;
  showAction?: boolean;
}> = ({ showAction, user }) => {
  const { name, height, gender, mass, eye_color, hair_color, skin_color, url } =
    user;
  const navigate = useNavigate();

  const urlArray = url?.split('/');
  const id = urlArray?.[urlArray?.length - 2];

  const handleDetailView = () => {
    navigate(`/user/${id}`);
  };

  return (
    <Card
      className="card-component"
      padding="xl"
      component="a"
      radius="lg"
      withBorder
    >
      <Center>
        <Image
          src={`https://robohash.org/${id}?set=set5&size=180x180`}
          height={60}
          width={60}
        />
        <Text fw={500} size="lg" mt="md">
          {name}
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
              style={{ fontWeight: 'bold', color: 'black', marginRight: '7px' }}
            >
              Height :{' '}
            </span>{' '}
            {height}
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
              style={{ fontWeight: 'bold', color: 'black', marginRight: '7px' }}
            >
              Gender :{' '}
            </span>{' '}
            {gender}
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
              style={{ fontWeight: 'bold', color: 'black', marginRight: '7px' }}
            >
              Mass :{' '}
            </span>{' '}
            {mass}
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
              style={{ fontWeight: 'bold', color: 'black', marginRight: '7px' }}
            >
              Eye Color :{' '}
            </span>{' '}
            {eye_color}
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
              style={{ fontWeight: 'bold', color: 'black', marginRight: '7px' }}
            >
              Hair Color :{' '}
            </span>{' '}
            {hair_color}
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
              style={{ fontWeight: 'bold', color: 'black', marginRight: '7px' }}
            >
              Skin Color :{' '}
            </span>{' '}
            {skin_color}
          </Text>
        </div>
      </Center>
      {showAction && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1rem',
          }}
        >
          <Button
            color="blue"
            style={{ width: '20%' }}
            radius="md"
            onClick={handleDetailView}
          >
            View User
          </Button>
        </div>
      )}
    </Card>
  );
};
export default UserCard;
