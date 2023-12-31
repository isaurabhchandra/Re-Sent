
import { Button, Modal } from 'rsuite';
import { useModelState } from '../../../misc/custom-hook';
import ProfileAvatar from '../../dashboard/ProfileAvatar';

const ProfileInfoBtn = ({ profile,  ...btnProps }) => {
  const { isOpen, close, open } = useModelState();

  const { name, avatar, createdAt } = profile;

  const shortName = name.split(' ')[0];
  const memberSince = new Date(createdAt).toLocaleDateString();

  return (
    <>
      <Button {...btnProps} onClick={open}>
        {shortName}
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{shortName} Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar
            src={avatar}
            name={name}
            className="width-200 height-200 img-fullsize font-huge"
          />
          <h4 className="mt-2">{name}</h4>
          <p>Member Since {memberSince}</p>
        </Modal.Body>
        <Modal.Footer>
        
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoBtn;
