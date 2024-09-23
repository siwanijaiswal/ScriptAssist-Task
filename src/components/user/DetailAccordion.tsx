import { Accordion } from '@mantine/core';
import FilmIcon from '../../assets/film-slate.png';
import CarIcon from '../../assets/car.png';
import ShipIcon from '../../assets/rocket.png';
import { FilmList } from '../film/FilmList';
import { VehicleList } from '../vehicle/VehicleList';
import SpeciesIcon from '../../assets/species.png';
import { StarShipList } from '../starShips/StarShipList';
import { SpeciesList } from '../species/SpeciesList';

const DetailAccordion = (props: any) => {
  const { userDetail } = props;

  const subsequentDetails = [
    {
      image: FilmIcon,
      value: 'Films',
      description: <FilmList filmLinks={userDetail.films} />,
    },
    {
      image: SpeciesIcon,
      value: 'Species',
      description: <SpeciesList speciesLink={userDetail.species} />,
    },
    {
      image: ShipIcon,
      value: 'StarShips',
      description: <StarShipList starShipLinks={userDetail.starships} />,
    },
    {
      image: CarIcon,
      value: 'Vehicles',
      description: <VehicleList vehicleLinks={userDetail.vehicles} />,
    },
  ];

  const items = subsequentDetails.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control
        icon={
          <img
            src={item.image}
            alt={item.value}
            style={{ width: 24, height: 24 }}
          />
        }
      >
        {item.value}
      </Accordion.Control>
      <Accordion.Panel>
        <div style={{ marginLeft: '20px' }}>{item.description}</div>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return <Accordion>{items}</Accordion>;
};

export default DetailAccordion;
