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

  // Sorting related state
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeSortButton, setActiveSortButton] = useState<string | null>(null);

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
      let newFilteredUsers = users.filter((user) => {
        return user.name
          .toLocaleLowerCase()
          .includes(searchField.toLowerCase());
      });

      // Apply sorting
      newFilteredUsers = newFilteredUsers.sort((a, b) => {
        let valA = a[sortCriteria];
        let valB = b[sortCriteria];

        // Parse strings to numbers for 'mass' and 'height'
        if (sortCriteria === 'mass' || sortCriteria === 'height') {
          valA = parseFloat(valA) || 0;
          valB = parseFloat(valB) || 0;
        }

        // Check if the value is a number or string for sorting
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
    setActiveSortButton(null);
  };

  const sortAscOrder = () => {
    setSortOrder('asc');
    setActiveSortButton('asc');
  };

  const sortDescOrder = () => {
    setSortOrder('desc');
    setActiveSortButton('desc');
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
              <div>
                {sortCriteria === 'name' && (
                  <div>
                    <button
                      onClick={sortAscOrder}
                      className={`sort-btn ${activeSortButton === 'asc' ? 'active' : ''}`}
                    >
                      {' '}
                      A - Z
                    </button>
                    <button
                      onClick={sortDescOrder}
                      className={`sort-btn ${activeSortButton === 'desc' ? 'active' : ''}`}
                    >
                      {' '}
                      Z - A
                    </button>
                  </div>
                )}

                {(sortCriteria === 'height' || sortCriteria === 'mass') && (
                  <div>
                    <button
                      onClick={sortAscOrder}
                      className={`sort-btn ${activeSortButton === 'asc' ? 'active' : ''}`}
                    >
                      ASC
                    </button>
                    <button
                      onClick={sortDescOrder}
                      className={`sort-btn ${activeSortButton === 'desc' ? 'active' : ''}`}
                    >
                      DESC
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Users users={filteredUsers} />
        </div>
      )}
    </div>
  );
};

export default ListPage;
