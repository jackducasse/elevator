import './App.css';
import { FLOORS } from './constants';
import { find, map, reject, times } from 'lodash';
import { OutsideCtrls } from './components/OutsideCtrls/OutsideCtrls';
import { Indicator } from './components/Indicator/Indicator';
import React from 'react';
import { InsideCtrls } from './components/InsideCtrls/InsideCtrls';
import { useRequestQueue } from './hooks/useRequestQueue';
import { useDoors } from './hooks/useDoors';
import { Doors } from './components/Doors/Doors';

function App() {
  const {
    isOpen,
    open: openDoors,
    close: closeDoors,
  } = useDoors();

  const {
    addToBacklog,
    backlog,
    // currentRequest: current,
    position,
  } = useRequestQueue({
    onReachFloor: openDoors,
    isDisabled: isOpen,
  });

  const internalFloorsBacklog = reject(backlog, 'direction');
  console.log('internalFloorsBacklog', internalFloorsBacklog)

  return (
    <div className="App">
      <div className="container">
        <div className="">
          {times(FLOORS, (index) => {
            // TODO: move out into component.
            const floor = FLOORS - index - 1;
            const upActive = find(backlog, {floor, direction: 1});
            const downActive = find(backlog, {floor, direction: -1});
            return (
              <div key={floor} className="floor">
                <OutsideCtrls 
                  floor={floor}
                  isUpActive={!!upActive}
                  isDownActive={!!downActive}
                  onCallElevator={addToBacklog}
                />
              </div>
            );
          })}
        </div>
        <div className="">
          {/* {active && 'loading...'} */}
          <Indicator floor={position.floor} direction={position.direction} />
          <Doors open={isOpen} />
        </div>
        <div className="">
          <InsideCtrls
              activeFloors={internalFloorsBacklog}
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
