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

  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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
      let newFilteredUsers = users.filter((user) =>
        user.name.toLocaleLowerCase().includes(searchField.toLowerCase())
      );

      newFilteredUsers = newFilteredUsers.sort((a, b) => {
        let valA = a[sortCriteria];
        let valB = b[sortCriteria];

        if (sortCriteria === 'mass' || sortCriteria === 'height') {
          valA = parseFloat(valA) || 0;
          valB = parseFloat(valB) || 0;
        }

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        } else if (typeof valA === 'string' && typeof valB === 'string') {
          return sortOrder === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return 0;
      });

      setFilteredUsers(newFilteredUsers);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchField, users, sortCriteria, sortOrder]);

  const onSearchChange = (event: any) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const handleSortCriteriaChange = (event: any) => {
    setSortCriteria(event.target.value);
  };

  const sortAscOrder = () => {
    setSortOrder('asc');
  };

  const sortDescOrder = () => {
    setSortOrder('desc');
  };

  const renderSortButtons = () => {
    const textAsc = sortCriteria === 'name' ? 'A - Z' : 'ASC';
    const textDesc = sortCriteria === 'name' ? 'Z - A' : 'DESC';

    return (
      <div>
        <button
          onClick={sortAscOrder}
          className={`sort-btn ${sortOrder === 'asc' ? 'active' : ''}`}
        >
          {textAsc}
        </button>
        <button
          onClick={sortDescOrder}
          className={`sort-btn ${sortOrder === 'desc' ? 'active' : ''}`}
        >
          {textDesc}
        </button>
      </div>
    );
  };

  return (
    <div className="listPage">
      {loading ? (
        <Loader />
      ) : (
        <div className="listed-contents">
          <div className="list-header">
            <Search onChangeHandler={onSearchChange} />

            <div className="sort-controls">
              <select
                onChange={handleSortCriteriaChange}
                className="sort-select"
                value={sortCriteria}
              >
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="height">Height</option>
                <option value="mass">Mass</option>
              </select>

              {sortCriteria && renderSortButtons()}
            </div>
          </div>

          <Users users={filteredUsers} />
        </div>
      )}
    </div>
  );
};

export default ListPage;
