import './App.css';
import { FLOORS } from './constants';
import { times } from 'lodash';
import { OutsideCtrls } from './components/OutsideCtrls/OutsideCtrls';
import { Indicator } from './components/Indicator/Indicator';
import React from 'react';
import { InsideCtrls } from './components/InsideCtrls/InsideCtrls';
import { useRequestQueue } from './hooks/useRequestQueue';
import { useDoors } from './hooks/useDoors';

function App() {
  const {
    isOpen,
    open: openDoors,
    close: closeDoors,
  } = useDoors();

  const {
    addToBacklog,
    // currentRequest: current,
    position,
  } = useRequestQueue({
    onReachFloor: openDoors,
  });


  return (
    <div className="App">
      <div className="container">
        <div className="">
          {times(FLOORS, (index) => {
            // TODO: move out into component.
            const floor = FLOORS - index - 1;
            return (
              <div key={floor} className="floor">
                <span>Floor {floor}:</span>
                <OutsideCtrls floor={floor} onCallElevator={addToBacklog} />
              </div>
            );
          })}
        </div>
        <div className="">
          {/* {active && 'loading...'} */}
          <Indicator floor={position.floor} direction={position.direction} />
          {'Doors: '}
          {isOpen ? 'open' : 'closed'}
        </div>
        <div className="">
          <InsideCtrls 
              onOpenDoors={openDoors}
              onCloseDoors={closeDoors}
              onSelectFloor={addToBacklog}
           />
        </div>
      </div>
    </div>
  );
}

export default App;
