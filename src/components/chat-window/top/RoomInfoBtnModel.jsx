import {memo} from 'react'
import { Button, Modal } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-roomcontext';
import { useModelState } from '../../../misc/custom-hook';

const RoomInfoBtnModel = () => {
  const { isOpen, close, open } = useModelState(); // Call useModelState to get the functions
  const description = useCurrentRoom(value => value.description);
  const name = useCurrentRoom(value => value.name);

  return (
    <>
      <Button appearance="link" className="px-0  " onClick={open} >
        About
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className='mb-1'>Description</h6>
          <p>{description}</p>
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

export default memo (RoomInfoBtnModel);
