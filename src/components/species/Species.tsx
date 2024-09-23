import { Card, Text, Group, Divider } from '@mantine/core';

export const SpeciesCard = ({ species }: any) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text weight={700} size="xl" mb="sm">
        {species.name}
      </Text>

      <Divider my="sm" />

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Classification:</Text>
        <Text>{species.classification}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Designation:</Text>
        <Text>{species.designation}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Skin Colors:</Text>
        <Text>{species.skin_colors}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Hair Colors:</Text>
        <Text>{species.hair_colors}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Average Lifespan:</Text>
        <Text>{species.average_lifespan}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Language:</Text>
        <Text>{species.language}</Text>
      </Group>
    </Card>
  );
};
