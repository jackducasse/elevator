import Axios from 'axios';
import { callElevator as callElevatorApi } from '../api/user/callElevator';

export const callElevator = async ({ floor, direction }) => {
    // This should be an API call..
    const x = await Axios.post(`http://localhost:8080/call`, {floor, direction});
    console.log('xxx', x);
}