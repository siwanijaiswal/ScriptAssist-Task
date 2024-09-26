import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from '@mantine/core';
import DetailAccordion from '../../components/user/DetailAccordion';
import UserCard from '../../components/user/User';
import { getPeople } from '../../service/user';
import { Loader } from '../../components/common/Loader';
import ArrowIcon from '../../assets/arrow.png';

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userDetail, setUserDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetail = async (id: string) => {
    try {
      const response = await getPeople(id);
      setUserDetail(response.data);
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
    <div>
      <Card padding="xl" radius="lg" withBorder className="detailCard">
        {userDetail && <UserCard user={userDetail} showAction={false} />}
        <DetailAccordion userDetail={userDetail} />
      </Card>
    </div>
  );
};

export default DetailPage;
