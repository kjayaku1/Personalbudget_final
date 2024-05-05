import "./loader.scss";
function Loading() {
  return (
    <div
      className="loading-overlay"
      role="status"
    >
      <div className="spinner-border">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
export default Loading;
