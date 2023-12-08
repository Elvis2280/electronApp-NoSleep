import { ipcRenderer } from 'electron';
import { commandNoSleep, commandSleep } from './utils/contanst';
import { styled } from '@stitches/react';

const Button = styled('button', {
  width: '150px',
  backgroundColor: 'black',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#555555',
  },
  '&:active': {
    backgroundColor: '#777777',
  },
});
function App() {
  const handleSwichSleepMode = (isSleep: boolean) => {
    const command = isSleep ? commandSleep : commandNoSleep;
    ipcRenderer.send('execute-command', command);

    ipcRenderer.on('command-result', (event, data) => {
      console.log(event);
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.result);
      }
    });
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: 'white',
        backgroundColor: '#333333',
        padding: '0',
        margin: '0',
        rowGap: '10px',
      }}
      className="w-screen h-screen bg-slate-500"
    >
      <Button
        onClick={() => handleSwichSleepMode(true)}
        className=" bg-red-800 px-4"
      >
        Enable Sleep
      </Button>
      <Button onClick={() => handleSwichSleepMode(false)}>Disable Sleep</Button>
    </div>
  );
}

export default App;
