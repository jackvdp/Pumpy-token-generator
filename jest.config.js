module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};
