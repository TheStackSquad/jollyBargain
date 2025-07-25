// src/components/countdown.js

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { pulseAnimation, timerFlip } from "../animation/flashDealAnimate";

export const useCountdown = (onTimerEnd) => {
  // Fixed: prefer-destructuring - Use array destructuring for useState
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [urgencyLevel, setUrgencyLevel] = useState("new");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const getNextCycleTime = () => {
    const now = new Date();
    const lagosTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Africa/Lagos" }),
    );
    const currentHour = lagosTime.getHours();
    const cycleHours = [0, 6, 12, 18];

    let nextCycleHour = cycleHours.find((hour) => hour > currentHour);
    if (!nextCycleHour) {
      // eslint-disable-next-line prefer-destructuring
      nextCycleHour = cycleHours[0]; // Next day's first cycle
    }

    const nextCycle = new Date(lagosTime);
    nextCycle.setHours(nextCycleHour, 0, 0, 0);

    if (nextCycleHour <= currentHour) {
      nextCycle.setDate(nextCycle.getDate() + 1);
    }

    return nextCycle;
  };

  const getUrgencyLevel = (timeRemaining) => {
    const totalMinutes = timeRemaining.hours * 60 + timeRemaining.minutes;

    if (totalMinutes <= 30) return "urgent";
    if (totalMinutes <= 120) return "medium";
    return "new";
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const lagosTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Africa/Lagos" }),
      );
      const nextCycle = getNextCycleTime();

      const difference = nextCycle - lagosTime;

      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Fixed: no-shadow - Renamed local variable to avoid shadowing
      const newTimeRemaining = { hours, minutes, seconds };
      return newTimeRemaining;
    };

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();

      if (
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsRefreshing(true);

        setTimeout(() => {
          onTimerEnd();
          setIsRefreshing(false);
        }, 2000);
      }

      setTimeLeft(newTimeLeft);
      setUrgencyLevel(getUrgencyLevel(newTimeLeft));
    }, 1000);

    // Initialize
    const initialTimeLeft = calculateTimeLeft();
    setTimeLeft(initialTimeLeft);
    setUrgencyLevel(getUrgencyLevel(initialTimeLeft));

    return () => clearInterval(timer);
  }, [onTimerEnd]);

  return { timeLeft, urgencyLevel, isRefreshing };
};

export function CountdownTimer({ onTimerEnd, className = "" }) {
  const { timeLeft, urgencyLevel, isRefreshing } = useCountdown(onTimerEnd);

  const getUrgencyColors = () => {
    switch (urgencyLevel) {
      case "urgent":
        return "bg-red-500 text-white border-red-600";
      case "medium":
        return "bg-orange-500 text-white border-orange-600";
      default:
        return "bg-green-500 text-white border-green-600";
    }
  };

  const getUrgencyText = () => {
    switch (urgencyLevel) {
      case "urgent":
        return "ENDS SOON!";
      case "medium":
        return "FEW HOURS LEFT";
      default:
        return "NEW DEALS";
    }
  };

  if (isRefreshing) {
    return (
      <div className={`text-center ${className}`}>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
          <span className="text-xl font-semibold text-gray-700">
            Loading New Deals...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <motion.div
        className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${getUrgencyColors()}`}
        // Fixed: react/jsx-props-no-spreading - Explicitly pass props
        initial={urgencyLevel === "urgent" ? pulseAnimation.initial : undefined}
        animate={urgencyLevel === "urgent" ? pulseAnimation.animate : undefined}
        transition={
          urgencyLevel === "urgent" ? pulseAnimation.transition : undefined
        }
      >
        {getUrgencyText()}
      </motion.div>

      <div className="flex justify-center space-x-4">
        <TimerUnit
          value={timeLeft.hours}
          label="Hours"
          urgencyLevel={urgencyLevel}
        />
        <TimerSeparator />
        <TimerUnit
          value={timeLeft.minutes}
          label="Minutes"
          urgencyLevel={urgencyLevel}
        />
        <TimerSeparator />
        <TimerUnit
          value={timeLeft.seconds}
          label="Seconds"
          urgencyLevel={urgencyLevel}
        />
      </div>
    </div>
  );
}

function TimerUnit({ value, label, urgencyLevel }) {
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value);
    }
  }, [value, prevValue]);

  const formatTime = (time) => String(time).padStart(2, "0");

  // Helper function to determine border color
  const getBorderColor = (level) => {
    switch (level) {
      case "urgent":
        return "border-red-500";
      case "medium":
        return "border-orange-500";
      default:
        return "border-green-500";
    }
  };

  return (
    <div className="text-center">
      <motion.div
        className={`text-4xl md:text-6xl font-bold bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg border-2 ${getBorderColor(
          urgencyLevel,
        )}`}
        key={value}
        // Fixed: react/jsx-props-no-spreading - Explicitly pass props
        initial={timerFlip.initial}
        animate={timerFlip.animate}
        transition={timerFlip.transition}
      >
        {formatTime(value)}
      </motion.div>
      <div className="text-sm mt-2 text-gray-600 font-medium">{label}</div>
    </div>
  );
}

function TimerSeparator() {
  return (
    <div className="flex items-center">
      <motion.div
        className="text-4xl md:text-6xl font-bold text-gray-900"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        :
      </motion.div>
    </div>
  );
}

export default CountdownTimer;
