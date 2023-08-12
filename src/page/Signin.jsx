import { Container,Grid,Row,Panel, Col, Button ,Icon,Alert} from 'rsuite';
import firebase from 'firebase/app';
import {auth, database} from '../misc/firebase';
const SignIn = () => {
    const signInWithProvider = async (provider) => {
      try {
        const {additionalUserInfo,user} = await auth.signInWithPopup(provider);

        if (additionalUserInfo.isNewUser){
            await database.ref(`/profiles/${user.uid}`).set({
                name: user.displayName,
                createdAt: firebase.database.ServerValue.TIMESTAMP
              })
              
              
        }
        Alert.success('Signed in', 4000)
        // console.log('result', result);
      } catch (error) {
        // console.error('Error signing in:', error.message);
        Alert.error(error.message,4000)
      }
    };
  
    const onFacebookSignIn = () => {
      signInWithProvider(new firebase.auth.FacebookAuthProvider());
    };
  
    const onGoogleSignIn = () => {
      signInWithProvider(new firebase.auth.GoogleAuthProvider());
    };

  return (
    <Container>
      <Grid className='mt-page'>
        <Row>
          <Col xs = {24} md={12} mdOffset = {6}>
          <Panel>
          <div className='text-center'>
          <h1>Welcome To ReSent</h1>
          <h6>Every Good Conversatation Starts With Good Listening</h6>
          </div>
          <div className='mt-3'>
            <Button block color = "blue" onClick = {onFacebookSignIn}>
                <Icon icon = "facebook"/> Continue With Facebook

            </Button>
            <Button block color = "green" onClick = {onGoogleSignIn}>
                <Icon icon = "google" /> Continue With Google

            </Button>
          </div>
          </Panel>
          
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
