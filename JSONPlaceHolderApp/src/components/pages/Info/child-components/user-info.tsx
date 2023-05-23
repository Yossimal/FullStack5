import { Card } from 'react-bootstrap';
import User from '../../../../lib/data/dataObjects/User';
import { useEffect, useState } from 'react';
import EdibaleLabel from '../../../edibaleLabel/edibale-label';
import BlockButton from '../../../common/BlockButton/block-button';

type UserItemProps = {
    user: User;
};

const UserInfo = ( {user}: UserItemProps ) => {
  const { name, username, address, phone, website, company } = user;
  const { street, suite, city, zipcode, geo } = address || {};
  const { lat, lng } = geo || {};
  const { name: companyName, catchPhrase, bs } = company || {};

  const [isEditable, setIsEditable] = useState(false);
  const [usernameValue, setUsernameValue] = useState<string>(username??"");

  useEffect(() => {
    setUsernameValue(username??"");
  }, [username]);
  
  

  return (<>
    <Card className="user-card">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <EdibaleLabel isEditable={isEditable} label='User Name' setter={setUsernameValue} value={usernameValue} WrapperComponent={Card.Text} />
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
    <BlockButton onClick={() => setIsEditable(!isEditable)}>{isEditable ? "Save" : "Edit"}</BlockButton>
    </>
  );
};

export default UserInfo;