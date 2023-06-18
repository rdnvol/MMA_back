#! /bin/bash
rm -rf /tmp/cot-api.json /tmp/cot-api-types ./src/types/api-types
curl https://sharedingress-nsk-curry-nonprod-us-west-2.nordstromaws.app/app07485/supplier-offer-bff/swagger-json > /tmp/cot-api.json
npx @openapitools/openapi-generator-cli generate -i /tmp/cot-api.json -g typescript-angular -o /tmp/cot-api-types --skip-validate-spec --additional-properties=stringEnums=true --type-mappings=set=Array
mv /tmp/cot-api-types/model ./src/types/api-types
mv ./src/types/api-types/models.ts ./src/types/api-types/index.ts
find ./src/types/api-types -type f -exec sed -i '' -e 's/interface/class/g' {} \;
find ./src/types/api-types -type f -exec sed -i '' -e 's/\/\*\*/\/\* eslint-disable \*\/ \'$'\n\/\*/' {}  \;
