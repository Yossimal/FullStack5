import { Card } from 'react-bootstrap';
import User from '../../../../lib/data/dataObjects/User';

type UserItemProps = {
    user: User;
};

const UserInfo = ( {user}: UserItemProps ) => {
  const { name, username, address, phone, website, company } = user;
  const { street, suite, city, zipcode, geo } = address || {};
  const { lat, lng } = geo || {};
  const { name: companyName, catchPhrase, bs } = company || {};

  return (
    <Card className="user-card">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Username: {username}</Card.Text>
        <Card.Text>Address: {street}, {suite}, {city}, {zipcode}</Card.Text>
        <Card.Text>Latitude: {lat}</Card.Text>
        <Card.Text>Longitude: {lng}</Card.Text>
        <Card.Text>Phone: {phone}</Card.Text>
        <Card.Text>Website: {website}</Card.Text>
        <Card.Text>Company: {companyName}</Card.Text>
        <Card.Text>Catchphrase: {catchPhrase}</Card.Text>
        <Card.Text>BS: {bs}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;