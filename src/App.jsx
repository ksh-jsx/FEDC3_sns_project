function App() {
  var a = 1;
  const temp = (e) => {
    console.log(e.target);
    console.log(a);
  };
  return (
    <>
      <div onClick={temp}>Hello, World!</div>
      <div>Hello, World!</div>
    </>
  );
}

export default App;
