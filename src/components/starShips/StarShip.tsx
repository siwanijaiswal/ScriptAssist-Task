import { Card, Text, Group, Divider } from '@mantine/core';

export const StarShipCard = ({ StarShip }: any) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text weight={700} size="xl" mb="sm">
        {StarShip.name}
      </Text>

      <Divider my="sm" />

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Model:</Text>
        <Text>{StarShip.model}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Manufacturer:</Text>
        <Text>{StarShip.manufacturer}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Crew:</Text>
        <Text>{StarShip.crew}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Passengers:</Text>
        <Text>{StarShip.passengers}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Cargo Capacity:</Text>
        <Text>{StarShip.cargo_capacity}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Consumables:</Text>
        <Text>{StarShip.consumables}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Hyperdrive Rating:</Text>
        <Text>{StarShip.hyperdrive_rating}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Starship Class:</Text>
        <Text>{StarShip.starship_class}</Text>
      </Group>
    </Card>
  );
};
