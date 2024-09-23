import { Card, Text, Group, Divider } from '@mantine/core';

export const VehicleCard = ({ vehicle }: any) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text weight={700} size="xl" mb="sm">
        {vehicle.name}
      </Text>

      <Divider my="sm" />

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Model:</Text>
        <Text>{vehicle.model}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500} size="sm">
          Manufacturer:
        </Text>
        <Text size="sm">{vehicle.manufacturer}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Crew:</Text>
        <Text>{vehicle.crew}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Passengers:</Text>
        <Text>{vehicle.passengers}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Cargo Capacity:</Text>
        <Text>{vehicle.cargo_capacity}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Cargo Capacity:</Text>
        <Text>{vehicle.cargo_capacity}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Vehicle Class:</Text>
        <Text>{vehicle.vehicle_class}</Text>
      </Group>
    </Card>
  );
};
