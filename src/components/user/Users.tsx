import { FC } from 'react';
import { Text, Center } from '@mantine/core';
import UserCard from './User';

const Users: FC<{ users: Record<string, any>[] }> = ({ users }) => {
  return (
    <div className="card-list">
      {users.length ? (
        users.map((user, index) => (
          <UserCard key={index} user={user} showAction={true} />
        ))
      ) : (
        <Center style={{ marginTop: '2rem' }}>
          <Text color="dimmed" size="xl" weight={500}>
            No users found
          </Text>
        </Center>
      )}
    </div>
  );
};

export default Users;
