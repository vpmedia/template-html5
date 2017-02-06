// flow-typed signature: 41172d66830cf8548c01de6835be5ea3
// flow-typed version: 622c2ee76d/webfontloader_v1.x.x/flow_>=v0.23.x

declare module 'webfontloader' {
  declare type WebFontConfig = {
    loading?: () => mixed,
    active?: () => mixed,
    inactive?: () => mixed,

    fontloading?: (familyName: string, fvd: string) => mixed,
    fontactive?: (familyName: string, fvd: string) => mixed,
    fontinactive?: (familyName: string, fvd: string) => mixed,

    classes?: boolean,
    events?: boolean,

    timeouts?: number,

    custom?: {
      families: string[],
      urls: string[],
      testStrings: { [k: string]: string },
    },

    fontdeck?: {
      id: string,
    },

    monotype?: {
      projectId: string,
      version?: number,
    },

    google?: {
      families: string[],
      text?: string,
    },

    typekit?: {
      id: string,
    },
  }
  declare class WebFont {
    load(config: WebFontConfig): void;
  }

  declare var exports: WebFont;
}

