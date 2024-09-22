import { FC, useEffect, useState } from 'react';
import { Center, Loader } from '@mantine/core';
import CardList from '../../components/cardList/CardList';
import Search from '../../components/searchBox/SearchUsers';

const ListPage: FC = () => {
  const [searchField, setSearchField] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState([users]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchField);

  let API = 'https://swapi.dev/api/people';

  const fetchApiData = async (url: string): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setUsers(data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiData(API);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchField);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchField]);

  useEffect(() => {
    const newFilteredUsers = users.filter((user) => {
      return user.name
        .toLocaleLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
    });
    setFilteredUsers(newFilteredUsers);
  }, [users, debouncedSearchTerm]);

  const onSearchChange = (event: any) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="listPage">
      {loading ? (
        <Center
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2rem',
          }}
        >
          <Loader color="blue" size={50} />
        </Center>
      ) : (
        <div className="listed-contents">
          <Search onChangeHandler={onSearchChange} />
          <CardList users={filteredUsers} />
        </div>
      )}
    </div>
  );
};

export default ListPage;
