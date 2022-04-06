interface Config {
  readonly shelterApiUrl?: string;
}

let __SHELTER_API_CONFIG__: Config = {}; // tslint:disable-line: no-let

function getConfig() {
  return { ...__SHELTER_API_CONFIG__ };
}

function setConfig(cfg: Config = {}) {
  __SHELTER_API_CONFIG__ = { ...cfg };
}

export {
  Config,
  getConfig, setConfig,
};
