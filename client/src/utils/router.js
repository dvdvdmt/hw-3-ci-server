export function toBuildHistory() {
  return '/';
}

export function toSettings() {
  return '/settings';
}

export function toBuildDetails(buildNumber = ':buildNumber') {
  return `/build/${buildNumber}`;
}
