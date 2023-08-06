import { Button, Icon, Drawer } from 'rsuite';
import { useModelState } from '../../misc/custom-hook';
import Dashboard from './MainDashboard';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModelState();
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
