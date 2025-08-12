type ProcessEnvShouldBeSuppliedByResources = {
JWT_SECRET: string;
FLOOT_DATABASE_URL: string;
POSTGRESQL_DATABASE_CONNECTION_STRING: string;
NODE_ENV: string;
}

// Override the global process variable
declare var process: {
  env: ProcessEnvShouldBeSuppliedByResources;
};
