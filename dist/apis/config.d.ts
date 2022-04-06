interface Config {
    readonly shelterApiUrl?: string;
}
declare function getConfig(): {
    shelterApiUrl?: string | undefined;
};
declare function setConfig(cfg?: Config): void;
export { Config, getConfig, setConfig, };
