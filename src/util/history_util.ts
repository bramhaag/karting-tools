export function setQuery(key: string, value: string) {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value)

    const loc = window.location
    const url = `${loc.protocol}//${loc.host}${loc.pathname}?${params}${loc.hash}`
    window.history.pushState({
        path: url
    }, '', url);
}