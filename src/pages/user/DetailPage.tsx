import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from '@mantine/core';
import DetailAccordion from '../../components/user/DetailAccordion';
import UserCard from '../../components/user/User';
import { getPeople } from '../../service/user';
import { Loader } from '../../components/common/Loader';
import ArrowIcon from '../../assets/arrow.png';
import { Link } from 'react-router-dom';

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userDetail, setUserDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetail = async (id: string) => {
    try {
      const response = await getPeople(id);
      setUserDetail(response.data);
      console.log(userDetail);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetail(id);
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Link to="/users">
        <Button
          color="blue"
          style={{
            // flexGrow: 1,
            width: '180px',
            marginTop: '3rem',
            marginLeft: '1rem',
            marginRight: '0',
          }}
          radius="xl"
        >
          <img
            src={ArrowIcon}
            width={30}
            height={30}
            alt="back_arrow"
            style={{ marginRight: '10px' }}
          />{' '}
          Back
        </Button>
      </Link>
      <Card padding="xl" radius="lg" withBorder className="detailCard">
        {userDetail && <UserCard user={userDetail} showAction={false} />}
        <DetailAccordion userDetail={userDetail} />
      </Card>
    </div>
  );
};

export default DetailPage;
