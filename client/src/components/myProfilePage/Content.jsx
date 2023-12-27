import UpdateContent from './UpdateContent';
import ReadContent from './ReadContent';
import { useEffect, useState } from 'react';
import { userIdRead } from '../../utils/userInformation';

const Content = ({
  isEdit,
  nickName,
  setNickName,
  newPassword,
  setNewPassword,
  newPasswordConfirmed,
  setNewPasswordConfirmed,
  handleUpdate,
}) => {
  //UpdateContent || ReadContent

  const [readUserId, setReadUserId] = useState('');
  const [readNickName, setReadNickName] = useState('');
  const [readEmail, setReadEmail] = useState('');

  const fetchData = async () => {
    try {
      const { userId, nickName, email } = await userIdRead();
      setReadUserId(userId);
      setReadNickName(nickName);
      setReadEmail(email);
    } catch (err) {
      // Handle the error
      console.error('Error while fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isEdit]);

  return (
    <>
      {isEdit ? (
        <UpdateContent
          nickName={nickName}
          setNickName={setNickName}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          newPasswordConfirmed={newPasswordConfirmed}
          setNewPasswordConfirmed={setNewPasswordConfirmed}
          handleUpdate={handleUpdate}
          readUserId={readUserId}
          readNickName={readNickName}
        />
      ) : (
        <ReadContent
          readEmail={readEmail}
          readUserId={readUserId}
          readNickName={readNickName}
        />
      )}
    </>
  );
};

export default Content;
