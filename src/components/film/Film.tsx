import { Card, Text, Group, Divider } from '@mantine/core';

export const FilmCard = ({ film }: any) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text weight={700} size="xl" mb="sm">
        {film.title}
      </Text>

      <Divider my="sm" />

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Director:</Text>
        <Text>{film.director}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Producer:</Text>
        <Text>{film.producer}</Text>
      </Group>

      <Group position="apart" style={{ marginBottom: '12px' }}>
        <Text weight={500}>Release Date:</Text>
        <Text>{film.release_date}</Text>
      </Group>

      <Divider my="sm" />

      <Text weight={500} mt="md">
        Description:
      </Text>
      <Text color="dimmed" mt="xs">
        {film.opening_crawl}
      </Text>
    </Card>
  );
};
