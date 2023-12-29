import ReadContent from './ReadContent';

const Content = ({ readNickName, readUserId, readEmail }) => {
  return (
    <ReadContent
      readEmail={readEmail}
      readUserId={readUserId}
      readNickName={readNickName}
    />
  );
};

export default Content;
