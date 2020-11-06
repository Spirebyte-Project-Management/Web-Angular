export interface SettingsModel {
    placeholder?: string;
    delimiters?: string;
    pattern?: string | RegExp;
    mode?: string;
    mixTagsInterpolator?: string[];
    mixTagsAllowedAfter?: RegExp;
    duplicates?: boolean;
    enforceWhitelist?: boolean;
    autoComplete?: {
        enabled?: boolean;
        rightKey?: boolean;
    };
    whitelist?: string[] | Object[];
    blacklist?: string[] | Object[];
    addTagOnBlur?: boolean;
    callbacks?: Object;
    maxTags?: number;
    editTags?: number;
    templates?: {
        wrapper?: Function;
        tag?: Function;
        dropdownItem?: Function;
        dropdownItemNoMatch?: Function;
    };
    transformTag?: Function;
    keepInvalidTags?: boolean;
    skipInvalid?: boolean;
    backspace?: any;
    originalInputValueFormat?: Function;
    dropdown?: {
        enabled?: number | false;
        caseSensitive?: boolean;
        maxItems?: number;
        classname?: string;
        fuzzySearch?: boolean;
        accentedSearch?: boolean;
        position?: string;
        highlightFirst?: boolean;
        closeOnSelect?: boolean;
        mapValueTo?: string | Function;
        searchKeys?: string[];
        appendTarget?: any;
    };
  }