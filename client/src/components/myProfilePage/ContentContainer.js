import { styled } from 'styled-components';
import Title from './Title';
import Content from './Content';
import { userIdRead } from '../../utils/userInformation';
import { useEffect, useState } from 'react';

const ContentContainer = () => {
  const [readUserId, setReadUserId] = useState('');
  const [readNickName, setReadNickName] = useState('');
  const [readEmail, setReadEmail] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const fetchData = async () => {
    try {
      const { userId, nickName, email, imageUrl } = await userIdRead();
      setReadUserId(userId);
      setReadNickName(nickName);
      setReadEmail(email);
      setImageFile(imageUrl);
    } catch (err) {
      console.error('Error while fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContentWrapper>
      <Title imageFile={imageFile} />
      <Content
        readEmail={readEmail}
        readNickName={readNickName}
        readUserId={readUserId}
      />
    </ContentWrapper>
  );
};

export default ContentContainer;

const ContentWrapper = styled.div`
  width: 390px;
  height: 844px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
