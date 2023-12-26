import UpdateContent from './UpdateContent';
import ReadContent from './ReadContent';

const Content = ({ isEdit }) => {
  return <>{isEdit ? <UpdateContent /> : <ReadContent />}</>;
};

export default Content;
