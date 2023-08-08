import  { useState } from 'react';
import { Button, Modal, Alert } from 'rsuite';
import { useModelState } from '../../misc/custom-hook';

const fileType = '.png,.jpeg,.jpg';

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const isValidFileType = file => {
  return acceptedFileTypes.includes(file.type);
};

const AvatarBtn = () => {
  const { isOpen, open, close } = useModelState();

  const [img, setImg] = useState(null);

  const onFileChange = ev => {
    const currentFile = ev.target.files;
    if (currentFile.length === 1) {
      const file = currentFile[0];
      if (isValidFileType(file)) {
        setImg(file);
        open();
      } else {
        Alert.warning(`Wrong File Type: ${file.type}`, 4000);
      }
    }
  };

  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select New Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileType}
            onChange={onFileChange}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and Upload new Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='d-flex justify-content-center'>
            {img && (
              <img
                src={URL.createObjectURL(img)}
                alt="Selected"
                style={{ maxWidth: '70%' }}
              />
            )}
            </div>
           
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="primary" onClick={close}>
              Cancel
            </Button>
            <Button
              block
              appearance="ghost"
            //   onClick={() => {
            //     // Perform upload logic here
            //     // Make sure to handle the upload and close the modal
            //     close();
            //   }}
            >
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarBtn;
