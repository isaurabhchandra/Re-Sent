import { Button, Divider, Drawer, Alert } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from './EditableInput';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvatarBtn from './AvatarBtn';
import { getUserUpdate } from '../../misc/helper';

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async newData => {
    // console.log(newData)

    try {
   

      const updates = await getUserUpdate(
        profile.uid,
        'name',
        newData,
        database
      );

      await database.ref().update(updates)
      Alert.success('Nickname has been updated', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>
          <h2>ReSent</h2>
        </Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name} </h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2"> Update Name</h6>}
        />
        <AvatarBtn />
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
