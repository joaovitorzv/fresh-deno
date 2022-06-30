/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

const timeFormat = new Intl.RelativeTimeFormat("en-US");

export default function Countdown(props: { eventTime: string }) {
  const eventTime = new Date(props.eventTime);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
      if (now > eventTime) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [eventTime]);

  if (now > eventTime) {
    return <div>The event is happening now!</div>;
  }

  const diffSeconds = Math.floor((eventTime.getTime() - now.getTime()) / 1000);
  return (
    <div>The event will begin {timeFormat.format(diffSeconds, "seconds")}</div>
  );
}
