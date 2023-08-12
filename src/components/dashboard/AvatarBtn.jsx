import { useState, useRef } from 'react';
import { Button, Modal, Alert } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { useModelState } from '../../misc/custom-hook';
import { storage,  database } from '../../misc/firebase'; // Import the firebase object
import ProfileAvatar from './ProfileAvatar';
import { useProfile } from '../../context/profile.context';

const fileType = '.png,.jpeg,.jpg';

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const isValidFileType = file => {
  return acceptedFileTypes.includes(file.type);
};
const getBlob = (canvas) =>{
  return new Promise((resolve,reject)=>{
    canvas.toBlob((blob)=>{
      if(blob){
        resolve(blob);

      }else{
        reject(new Error('File Process Error'))
      }
    });
  });
};

const AvatarBtn = () => {
  const { isOpen, open, close } = useModelState();

  const { profile } = useProfile();

  const [img, setImg] = useState(null);

  const [isLoading,setIsLoading] = useState();

  const avatarEditorRef = useRef();
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

  const onUploadClick = async () => {
   const canvas = avatarEditorRef.current.getImageScaledToCanvas();
setIsLoading(true)

try {
 const blob =  await getBlob(canvas);

 const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child('avatar')

const uploadAvatar = await avatarFileRef.put(blob,{
  cacheControl : `public, max-age =${3600*24*3}`
})

const downloadUrl =await uploadAvatar.ref.getDownloadURL()
const userAvatarRef = database.ref(`/profiles/${profile.uid}`).child('avatar');

userAvatarRef.set(downloadUrl);
setIsLoading(false)
Alert.info('Picture has been uploaded',3000)
close()
} catch (err) {
  setIsLoading(false)
  Alert.error(err.message,3000)
}
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />
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
            <div className="d-flex justify-content-center align-items-center h-100 ">
              {img && (
                <AvatarEditor
                ref = {avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="primary" onClick={close}>
              Cancel
            </Button>
            <Button block appearance="ghost" onClick={onUploadClick} disabled ={isLoading}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarBtn;
