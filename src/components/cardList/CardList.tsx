import { FC } from 'react';
import CardComponent from '../card/Card';

const CardList: FC<{ users: Record<string, any>[] }> = ({ users }) => {
  return (
    <div className="card-list">
      {users.map((user, index) => (
        <CardComponent key={index} user={user} />
      ))}
    </div>
  );
};

export default CardList;
