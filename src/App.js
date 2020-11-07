import React from 'react';
import { reject } from 'lodash';
import { OutsideCtrls } from './components/OutsideCtrls/OutsideCtrls';
import { Indicator } from './components/Indicator/Indicator';
import { InsideCtrls } from './components/InsideCtrls/InsideCtrls';
import { useRequestQueue } from './hooks/useRequestQueue';
import { useDoors } from './hooks/useDoors';
import { Doors } from './components/Doors/Doors';

import './App.css';

function App() {
  const {
    isOpen,
    open: openDoors,
    close: closeDoors,
  } = useDoors();

  const {
    addToBacklog,
    backlog,
    position,
  } = useRequestQueue({
    isDisabled: isOpen,
    onReachFloor: openDoors,
  });

  const internalFloorsBacklog = reject(backlog, 'direction');

  return (
    <div className="App">
      <div className="container">
        <div className="outsideCtrls">
          <OutsideCtrls 
            backlog={backlog}
            addToBacklog={addToBacklog}
          />
        </div>
        <div className="main">
          <div className="elevator">
            <Indicator floor={position.floor} direction={position.direction} />
            <Doors open={isOpen} />
          </div>
          <div className="insideCtrls">
            <InsideCtrls
                activeFloors={internalFloorsBacklog}
                onOpenDoors={openDoors}
                onCloseDoors={closeDoors}
                onSelectFloor={addToBacklog}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
