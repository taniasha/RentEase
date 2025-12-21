import React, { useEffect, useRef, useState } from "react";
import '../App.css';

const CountUpCards = () => {
  const stats = [
    { endValue: 200, label: "Properties for Rent" },
    { endValue: 20, label: "New This Month" },
    { endValue: 4, label: "New This Week" },
  ];

  // A nested card component
  const CountCard = ({ endValue, label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [started, setStarted] = useState(false);

    // When card becomes visible
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !started) {
            setStarted(true);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [started]);

    // Count-up logic
    useEffect(() => {
      if (!started) return;

      let current = 0;
      const duration = 1500;
      const step = endValue / (duration / 16);

      const counter = setInterval(() => {
        current += step;
        if (current >= endValue) {
          current = endValue;
          clearInterval(counter);
        }
        setCount(Math.floor(current));
      }, 16);

      return () => clearInterval(counter);
    }, [started, endValue]);

    return (
      <div ref={ref} className="count-card card-hover-property text-center p-4 shadow-sm rounded">
        <h1 className="count-number">{count}+</h1>
        <p className="count-label">{label}</p>
      </div>
    );
  };

  return (
    <div className="container my-4">
      <div className="row g-4 justify-content-center">
        {stats.map((item, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
            <CountCard endValue={item.endValue} label={item.label} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountUpCards;
