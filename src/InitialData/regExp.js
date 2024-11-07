const SuperExpressive = require("super-expressive");

export const emailFormat = {
    exp: SuperExpressive()
        .startOfInput
        .caseInsensitive
        .oneOrMore.anyOf
        .range('a', 'z')
        .range('A', 'Z')
        .range('0', '9')
        .anyOfChars('._-')
        .end()
        // .oneOrMore.word
        .exactly(1).char("@")
        .oneOrMore.word
        .exactly(1).char(".")
        .between(2, 4).range('a', 'z')
        .endOfInput
        .toRegex(),
    description: "email format",
    sample: "yourEmail@xxxxx.xxx"
};

export const mobileNoFormat = {
    exp: SuperExpressive()
        .startOfInput
        .exactly(1).char("0")
        .exactly(1).range(0, 9)
        .exactly(1).char("0")
        .exactly(8).range(0, 9)
        .endOfInput
        .toRegex(),
    description: "mobile number format",
    sample: "07012345678"
};

export const passwordFormat = {
    exp: SuperExpressive()
        .atLeast(8).anyOf
        .range('a', 'z')
        .range('A', 'Z')
        .range('0', '9')
        .anyOfChars('`~!@#$%^&*()-_=+,.<>/?[]{}|;:\\\'\"')
        .end()
        .toRegex(),
    description: "password format",
    sample: "asd1231@"
};

export const textFormat = {
    exp: SuperExpressive()
        .startOfInput
        .caseInsensitive
        .oneOrMore.anyChar
        .endOfInput
        .toRegex(),
    description: "text format",
    sample: "빈칸 없어야 함"
};

export const userNameFormat = {
    exp: /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{3,20}$/,
    description: "password format",
    sample: "asd1231@"
};