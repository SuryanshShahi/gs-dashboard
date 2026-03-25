import { useMemo } from "react";

const DISPLAY_NAME = "Admin";

function greetingForHour(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatTodayLong(): string {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const useHook = () => {
  const greeting = useMemo(
    () => `${greetingForHour()}, ${DISPLAY_NAME}`,
    [],
  );
  const dateLabel = useMemo(() => formatTodayLong(), []);

  return {
    greeting,
    dateLabel,
  };
};

export default useHook;
