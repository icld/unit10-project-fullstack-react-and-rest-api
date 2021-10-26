// error handler for 500 or other unhandled error occurance
const UnhandledError = () => (
  <main>
    <div className='wrap'>
      <h2>Error</h2>
      <p>Sorry! We just encountered an unexpected error.</p>
    </div>
  </main>
);

export default UnhandledError;
