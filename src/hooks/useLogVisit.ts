
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useLogVisit() {
  const location = useLocation();

  useEffect(() => {
    const log = async () => {
      try {
        await fetch(
          "https://xmhglmcbjzrjykgigxxy.functions.supabase.co/log-website-visit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ path: location.pathname }),
          }
        );
      } catch {}
    };
    log();
    // Only fire when pathname changes
    // eslint-disable-next-line
  }, [location.pathname]);
}
