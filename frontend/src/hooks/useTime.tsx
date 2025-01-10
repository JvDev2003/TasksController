import { useState, useEffect } from "react";

const useTime = () => {

    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(date.getHours())



    const hour = () => {

        return time
    }



    return {
        hour
    }

};

export default useTime;
