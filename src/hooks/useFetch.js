import { useEffect, useState } from 'react';

/**
 * Runs an async fetcher whenever `deps` change. Loading/error state is
 * derived by comparing the dependency key against the key of the last
 * resolved request, rather than toggled imperatively inside the effect —
 * this keeps every setState call confined to the async .then/.catch
 * callbacks instead of the synchronous body of the effect.
 */
export default function useFetch(fetcher, deps = []) {
  const depsKey = JSON.stringify(deps);
  const [state, setState] = useState({ key: null, data: null, error: null });

  useEffect(() => {
    let active = true;

    fetcher()
      .then((result) => {
        if (active) setState({ key: depsKey, data: result, error: null });
      })
      .catch((err) => {
        if (active) setState({ key: depsKey, data: null, error: err });
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depsKey]);

  const resolved = state.key === depsKey;

  return {
    data: resolved ? state.data : null,
    error: resolved ? state.error : null,
    loading: !resolved,
  };
}
