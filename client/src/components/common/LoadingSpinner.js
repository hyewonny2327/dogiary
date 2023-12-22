// LoadingSpinner 컴포넌트
const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Loading...</h2>
      {/* 추가적인 로딩 UI를 원하는 대로 디자인할 수 있습니다. */}
      <div className="spinner"></div>
    </div>
  );
};
export default LoadingSpinner;
