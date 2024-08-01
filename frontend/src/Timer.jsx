// Imports
import React, { useState, useRef, useEffect } from "react";

import PomodoroAPI from "./PomodoroAPI";

/** Timer Component
 * 
 * This component is responsible for rendering the countdown timer. It provides buttons to start, pause, and reset the timer. It also provides buttons to change the timer type (25 minutes, 15 minutes, 5 minutes).
 * 
 * Props:
 * - username: string
 * - activeTask: object like { id, name, pomodoros, completed, list_id }
 * 
 * State:
 * - timer: string
 * - isRunning: boolean
 * - remainingTime: number
 * - timerType: string
 * - isTimerEnd: boolean
 */
const Timer = ({ username, setIsTimerEnd, isTimerEnd }) => {
    const Ref = useRef(null);

    // The state for the timer
    const [timer, setTimer] = useState("25:00");
    const [isRunning, setIsRunning] = useState(false);
    const [remainingTime, setRemainingTime] = useState(1500);
    const [timerType, setTimerType] = useState("25min");

    const getTimeRemaining = (e) => {
        // find the amount of "seconds" between now and target
        const total =
            Date.parse(e) - Date.parse(new Date());
        // find the amount of "seconds" between now and target
        const seconds = Math.floor((total / 1000) % 60);
        // find the amount of "minutes" between now and target
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );

        return {
            total,
            minutes,
            seconds,
        };
    };

    const startTimer = (e) => {
        let { total, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 60 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );

            // update the remaining time, convert from milliseconds to seconds 
            setRemainingTime(total / 1000);
        } else {
            clearInterval(Ref.current);
            setIsRunning(false);

            // if onTimerEnd is set, call it
            setIsTimerEnd(true);
        };
    };

    const clearTimer = (e) => {
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            // only clear timer if running
            if (isRunning) {
                startTimer(e);
            }
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = (seconds) => {
        let deadline = new Date();

        // This is what needs to be adjusted if to add more time
        deadline.setSeconds(deadline.getSeconds() + seconds);
        return deadline;
    };

    const resetTimer = () => {
        let initialTime;
        switch (timerType) {
            case "25min":
                initialTime = 1500;
                break;
            case "15min":
                initialTime = 900;
                break;
            case "5min":
                initialTime = 300;
                break;
            default:
                initialTime = 1500;
        }
        setRemainingTime(initialTime);
        setTimer(`${Math.floor(initialTime / 60)}:00`);
    }

    // Effects
    useEffect(() => {
        resetTimer();
        clearTimer(getDeadTime(remainingTime));
        setIsTimerEnd(false);
    }, [timerType]);

    useEffect(() => {
        clearTimer(getDeadTime(remainingTime))
    }, [isRunning])


    useEffect(() => {
        async function updateUser() {
            // Update the user's num_pomodoros
            try {
                if( timerType === "25min" ) {
                    console.log("Incrementing Pomodoros username: ", username);
                    let updatedUser = await PomodoroAPI.incrementPomodoros(username);
                    console.log("Incrementing Pomodoros updatedUser: ", updatedUser);
                    return updatedUser;
                }
            }
            catch (err) {
                console.error("Update Pomodoros Error: ", err);
            }
        }
        if (isTimerEnd) {
            updateUser();
            // call a function to handle the timer end
            alert("Timer End");
        }
    }, [isTimerEnd]);

    // Event Handlers
    const onClickStart = () => {
        setIsRunning(true);
        // clearTimer(getDeadTime(remainingTime));
    }

    const onClickReset = () => {
        let initialTime;
        switch (timerType) {
            case "25min":
                initialTime = 1500;
                break;
            case "15min":
                initialTime = 900;
                break;
            case "5min":
                initialTime = 300;
                break;
            default:
                initialTime = 1500;
        }
        setRemainingTime(initialTime); 
        clearTimer(getDeadTime(initialTime));
        setTimer(`${Math.floor(initialTime / 60)}:00`);
    }

    const onClickPause = () => {
        setIsRunning(false);
        if (Ref.current) clearInterval(Ref.current);
    }

    const onClickChangeType = (type) => {
        setTimerType(type);
        setIsRunning(false);
        let initialTime;
        switch (type) {
            case "25min":
                initialTime = 1500;
                break;
            case "15min":
                initialTime = 900;
                break;
            case "5min":
                initialTime = 300;
                break;
            default:
                initialTime = 1500;
        }
        setRemainingTime(initialTime);
        setTimer(`${Math.floor(initialTime / 60)}:00`);
    }

    // Render
    return (
        <div
            style={{ textAlign: "center", margin: "auto" }}>
            <h1 style={{ color: "green" }}>
                GeeksforGeeks
            </h1>
            <h3>Countdown Timer Using React JS</h3>

            <button onClick={() => onClickChangeType("25min")}>Focus</button>
            <button onClick={() => onClickChangeType("15min")}>Long Break</button>
            <button onClick={() => onClickChangeType("5min")}>Short Break</button>

            <h2>{timer}</h2>
            <button onClick={onClickStart}>Start</button>
            <button onClick={onClickReset}>Reset</button>
            <button onClick={onClickPause}>Pause</button>
        </div>
    );
};

// Exports
export default Timer;