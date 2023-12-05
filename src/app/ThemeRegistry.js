"use client";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/helper/theme";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/Client";
import { EventEmitter } from "@/helper";
// import { subScriptionHandler } from "@/helper/Subscription";

export default function ThemeRegistry(props) {
  const { options, children } = props;
  const router = useRouter();

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });
  
  useEffect(()=>{
    const subscription = supabase.channel("subscriptions").on('postgres_changes',{
      event:'UPDATE',
      schema: 'public',
    },(payload) => [
      EventEmitter.dispatch('subscriptions',true)
    ]).subscribe();

    return () => subscription.unsubscribe();
  },[]);

  


  return (
    // <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <ToastContainer />
    </ThemeProvider>
    // </CacheProvider>
  );
}
