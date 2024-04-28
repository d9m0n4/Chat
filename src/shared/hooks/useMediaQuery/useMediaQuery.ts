import React from 'react';

const UseMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    let mounted = true;

    const matchQueryList = window.matchMedia(query);
    setMatches(matchQueryList.matches);

    function handleChange(e: MediaQueryListEvent) {
      if (!mounted) {
        return false;
      }
      setMatches(e.matches);
    }
    matchQueryList.addEventListener('change', handleChange);

    return () => {
      mounted = false;
      matchQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return Boolean(matches);
};

export default UseMediaQuery;
