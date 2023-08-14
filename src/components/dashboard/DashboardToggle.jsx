import { Button, Icon, Drawer, Alert } from 'rsuite';
import { useMediaQuery, useModelState } from '../../misc/custom-hook';
import Dashboard from './MainDashboard';
import { useCallback } from 'react';
import { auth, database } from '../../misc/firebase';
import { isOfflineForDatabase } from '../../context/profile.context';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModelState();
  const isMobile = useMediaQuery('(max-width:992px)')

  const onSignOut = useCallback(()=>{

   database.ref(`/status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(()=>{

    auth.signOut();
    Alert.info('Sign Out', 5000)
    close();
   }).catch(err =>{
    Alert.error(err.message, 5000)
   })
    

   
  

  },[close])
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Profile
      </Button>
      <Drawer full ={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut ={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
