import { FC, useEffect, useState } from 'react';
import Users from '../../components/user/Users';
import Search from '../../components/user/SearchUsers';
import { getPeoples } from '../../service/user';
import { Loader } from '../../components/common/Loader';

const ListPage: FC = () => {
  const [searchField, setSearchField] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: any = await getPeoples();
      setUsers(response?.data?.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      const newFilteredUsers = users.filter((user) => {
        return user.name
          .toLocaleLowerCase()
          .includes(searchField.toLowerCase());
      });
      setFilteredUsers(newFilteredUsers);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchField, users]);

  const onSearchChange = (event: any) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="listPage">
      {loading ? (
        <Loader />
      ) : (
        <div className="listed-contents">
          <Search onChangeHandler={onSearchChange} />
          <Users users={filteredUsers} />
        </div>
      )}
    </div>
  );
};

export default ListPage;
