import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["build/*", "demo/*", "**/*.d.ts"]), {
    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:storybook/recommended",
    ),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.jasmine,
            ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: 6,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                modules: true,
                experimentalObjectRestSpread: true,
            },
        },
    },

    settings: {},

    rules: {
        "comma-dangle": 0,

        "max-len": ["error", {
            code: 100,
            "ignoreComments": true
        }],

        "no-unused-vars": "off",
        "no-unexpected-multiline": "warn",
        "prefer-const": "warn",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-require-imports": ["error", {
            allow: ["path", "html-webpack-plugin", "terser-webpack-plugin", "./common.config"]
        }],
        "@typescript-eslint/no-var-requires": "off",
    },
}]);
