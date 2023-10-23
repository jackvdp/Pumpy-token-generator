module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {},
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
};
