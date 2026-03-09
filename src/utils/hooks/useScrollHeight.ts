import { useEffect, useRef, useState } from "react";

const useScrollHeight = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const handleScroll = () => {
    if (ref.current) {
      const position = ref.current.scrollTop;
      setScrollHeight(position);
    }
  };

  useEffect(() => {
    const div = ref.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
      setScrollHeight(div?.scrollTop);
    }
    return () => {
      if (div) {
        div.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return { ref, scrollHeight };
};

export default useScrollHeight;
