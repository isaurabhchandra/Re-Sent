import { memo } from 'react'; // Make sure to import 'memo' from 'react'
import { ButtonToolbar, Icon } from 'rsuite';
import { Link } from 'react-router-dom';
import { useCurrentRoom } from '../../../context/current-roomcontext';
import { useMediaQuery } from '../../../misc/custom-hook';
import RoomInfoBtnModel from './RoomInfoBtnModel';
import EditRoomDrawer from './EditRoomDrawer';

const Top = () => {
  const roomName = useCurrentRoom(value => value.name);


const isAdmin =useCurrentRoom(v=>v.isAdmin)

  const isMobile = useMediaQuery('(max-width: 992px)');

  const iconClasses = isMobile
    ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
    : 'd-none';

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-left"
            size="2x"
            className={iconClasses}
          />
          <span className="text-disappear">{roomName}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">
          {isAdmin &&  <EditRoomDrawer />}
         
        </ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span>todo</span>
        <RoomInfoBtnModel />
      </div>
    </div>
  );
};

export default memo(Top);
